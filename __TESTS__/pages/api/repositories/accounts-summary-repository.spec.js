import Chance from 'chance';

import {accountsSummaryRepository} from '../../../../pages/api/repositories/accounts-summary-repository';
import {conn} from '../../../../pages/api/repositories/transaction-wrapper-repository';

jest.mock('../../../../pages/api/repositories/transaction-wrapper-repository');

const chance = new Chance();

describe('accounts-summary-repository', () => {
    let expectedProps, queryMock;

    beforeEach(() => {
        expectedProps = {
            endDate: chance.date(),
            startDate: chance.date()
        };
        queryMock = jest.fn();

        conn.mockImplementation(() => ({
            query: queryMock
        }));
    });

    test('should make the query', async () => {
        const expectedQuery = `
            SELECT
                accounts.accountId,
                IFNULL(s.amount, 0) AS balance,
                accounts.accountName,
                accounts.category
            FROM
                accounts
            LEFT JOIN (
                SELECT
                    accountid,
                    SUM(amount) AS amount
                FROM (
                    SELECT
                        fromaccountid AS accountId,
                        amount * -1.00 AS amount,
                        accountName,
                        category
                    FROM
                        transactions
                    INNER JOIN
                        accounts
                    ON
                        accounts.accountid = transactions.fromaccountid
                    WHERE
                        DATE >= IF
                            (
                                accounts.category = 'Income'
                                OR
                                accounts.category = 'Expenses',
                                ?,
                                '2000-01-01'
                            )
                    AND 
                        DATE < IF
                            (
                                accounts.category = 'Income'
                                OR
                                accounts.category = 'Expenses',
                                ?,
                                '3000-01-01'
                            )
                    UNION ALL
                        SELECT
                            toaccountid,
                            amount,
                            accountName,
                            category
                    FROM
                        transactions
                    INNER JOIN
                        accounts
                    ON
                        accounts.accountid = transactions.toaccountid
                    WHERE  DATE >= IF
                        (
                            accounts.category = 'Income'
                            OR 
                            accounts.category = 'Expenses',
                            ?,
                            '2000-01-01'
                        )
                    AND DATE < IF
                        (
                            accounts.category = 'Income'
                            OR 
                            accounts.category = 'Expenses',
                            ?,
                            '3000-01-01'
                        )
                    ) t
                GROUP BY
                    accountId,
                    accountName,
                    category
                ) s
            ON accounts.accountId = s.accountid; 
        `;

        const expectedParams = [
            expectedProps.startDate,
            expectedProps.endDate,
            expectedProps.startDate,
            expectedProps.endDate
        ];

        await accountsSummaryRepository(expectedProps);

        expect(conn).toHaveBeenCalledTimes(1);
        expect(queryMock).toHaveBeenCalledTimes(1);

        const [actualQuery, actualParams] = queryMock.mock.calls[0];

        expect(actualQuery).toBeIgnoringWhitespace(expectedQuery);
        expect(actualParams).toStrictEqual(expectedParams);
    });
});
