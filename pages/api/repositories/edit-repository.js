import {conn} from './transaction-wrapper-repository';

export const editRepository = ({editedTransaction, transactionId}) => {
    const {amount, comment, date, fromAccountId, toAccountId, isMarkedAsSeen} = editedTransaction;

    return conn().query(
        `
            UPDATE
                transactions
            SET
                date = ?,
                fromAccountId = ?,
                toAccountId = ?,
                amount = ?,
                comment = ?,
                isMarkedAsSeen = ?
            WHERE
                transactionId = ?
		`,
        [date, fromAccountId, toAccountId, amount, comment, isMarkedAsSeen, transactionId]
    );
};
