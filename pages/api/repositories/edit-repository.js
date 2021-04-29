import {conn} from './transaction-wrapper-repository';

export const editRepository = ({editedTransaction, transactionId}) => {
    const {
        amount,
        comment,
        date,
        fromAccountId,
        toAccountId
    } = editedTransaction;

    return conn().query(
        `
            UPDATE
                transactions
            SET
                date = ?,
                fromAccountId = ?,
                toAccountId = ?,
                amount = ?,
                comment = ?
            WHERE
                transactionId = ?
		`,
        [
            date,
            fromAccountId,
            toAccountId,
            amount,
            comment,
            transactionId
        ]
    );
};
