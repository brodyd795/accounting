import {conn} from './transaction-wrapper-repository';

export const newTransactionRepository = ({date, fromAccountId, toAccountId, amount, comment, isMarkedAsSeen}) =>
    conn().query(
        `
            INSERT INTO
                transactions
            (
                date,
                fromAccountId,
                toAccountId,
                amount,
                comment,
                isMarkedAsSeen
            )
            VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
		`,
        [
            date,
            fromAccountId,
            toAccountId,
            amount,
            comment,
            isMarkedAsSeen
        ]
    );
