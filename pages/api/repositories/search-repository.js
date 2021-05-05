import {conn} from './transaction-wrapper-repository';

export const searchRepository = ({
    comment,
    fromAccount,
    fromAmount,
    fromDate,
    toAccount,
    toAmount,
    toDate
}) =>
    conn().query(
        `
            SELECT
                *
            FROM
                transactions
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
		`,
        [
            comment,
            fromAccount,
            fromAmount,
            fromDate,
            toAccount,
            toAmount,
            toDate
        ]
    );
