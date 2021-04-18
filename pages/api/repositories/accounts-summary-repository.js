import escape from 'sql-template-strings';

import {conn} from './transaction-wrapper-repository';

export const accountsSummaryRepository = ({date}) =>
    conn().query(
        escape`
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
                                '2021-02-01',
                                '2000-01-01'
                            )
                    AND 
                        DATE < IF
                            (
                                accounts.category = 'Income'
                                OR
                                accounts.category = 'Expenses',
                                '2021-03-01',
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
                            '2021-02-01',
                            '2000-01-01'
                        )
                    AND DATE < IF
                        (
                            accounts.category = 'Income'
                            OR 
                            accounts.category = 'Expenses',
                            '2021-03-01',
                            '3000-01-01'
                        )
                    ) t
                GROUP BY
                    accountId,
                    accountName,
                    category
                ) s
            ON accounts.accountId = s.accountid; 
		`
    );
