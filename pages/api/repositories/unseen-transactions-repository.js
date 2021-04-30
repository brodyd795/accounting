import {conn} from './transaction-wrapper-repository';

export const unseenTransactionsRepository = () =>
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
            isMarkedAsSeen = false; 
		`
    );
