import {conn} from './transaction-wrapper-repository';

export const markAsSeenRepository = ({transactionId}) =>
    conn().query(
        `
            UPDATE
                transactions
            SET
                isMarkedAsSeen = true
            WHERE
                transactionId = ?
		`,
        [transactionId]
    );
