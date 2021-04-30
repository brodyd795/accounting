import {conn} from './transaction-wrapper-repository';

export const deleteRepository = ({transactionId}) =>
    conn().query(
        `
            DELETE FROM
                transactions
            WHERE
                transactionId = ?
		`,
        [transactionId]
    );
