import {conn} from './transaction-wrapper-repository';

export const searchRepository = ({comment, fromAccount, fromAmount, fromDate, toAccount, toAmount, toDate}) =>
    conn().query(
        `
            SELECT
                transactionId,
                date,
                fromAccountId,
                toAccountId,
                accountsTo.accountName fromAccountName,
                accountsTo.category fromAccountCategory,
                accountsFrom.accountName toAccountName,
                accountsFrom.category toAccountCategory,
                amount,
                comment,
                isMarkedAsSeen
            FROM
                transactions
            INNER JOIN
                accounts accountsTo
            ON
                accountsTo.accountId = transactions.fromAccountId
            INNER JOIN
                accounts accountsFrom
            ON
                accountsFrom.accountId = transactions.toAccountId
            WHERE
                comment like ?
            AND
                fromAccountId REGEXP ?
            AND
                amount >= ?
            AND
                date >= ?
            AND
                toAccountId REGEXP ?
            AND
                amount <= ?
            AND
                date <= ?
            ORDER BY
                date
            DESC
		`,
        [comment, fromAccount, fromAmount, fromDate, toAccount, toAmount, toDate]
    );
