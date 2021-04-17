import Chance from 'chance';
import escape from 'sql-template-strings';

import {accountsSummaryRepository} from '../../../../pages/api/repositories/accounts-summary-repository';
import {conn} from '../../../../pages/api/repositories/transaction-wrapper-repository';

jest.mock('../../../../pages/api/repositories/transaction-wrapper-repository');
jest.mock('sql-template-strings');

const chance = new Chance();

describe('accounts-summary-repository', () => {
    let expectedProps, queryMock;

    beforeEach(() => {
        expectedProps = {
            date: chance.date()
        };
        queryMock = jest.fn();

        conn.mockImplementation(() => ({
            query: queryMock
        }));
    });
    test('should do a thing', async () => {
        await accountsSummaryRepository(expectedProps);

        const [[sql], params] = escape.mock.calls[0];

        const expectedSQL = `
            SELECT
                balances.balance,
                accounts.accountName,
                accounts.category,
                accounts.accountId
            FROM
                balances
            INNER JOIN
                accounts
            ON
                balances.accountId = accounts.accountId
            WHERE
                balances.date =
        `;

        expect(expectedSQL).toBeIgnoringWhitespace(sql);
        expect(params).toStrictEqual(expectedProps.date);
    });
});
