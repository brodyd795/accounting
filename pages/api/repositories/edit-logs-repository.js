import {conn} from './transaction-wrapper-repository';

export const editLogsRepository = ({
    transactionId,
    originalDate,
    originalFromAccountId,
    originalToAccountId,
    originalAmount,
    originalComment,
    originalIsMarkedAsSeen,
    newDate,
    newFromAccountId,
    newToAccountId,
    newAmount,
    newComment,
    newIsMarkedAsSeen
}) =>
    conn().query(
        `
            INSERT INTO
                edit_logs
            (
                transactionId,
                originalDate,
                originalFromAccountId,
                originalToAccountId,
                originalAmount,
                originalComment,
                originalIsMarkedAsSeen,
                newDate,
                newFromAccountId,
                newToAccountId,
                newAmount,
                newComment,
                newIsMarkedAsSeen
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
		`,
        [
            transactionId,
            originalDate,
            originalFromAccountId,
            originalToAccountId,
            originalAmount,
            originalComment,
            originalIsMarkedAsSeen,
            newDate,
            newFromAccountId,
            newToAccountId,
            newAmount,
            newComment,
            newIsMarkedAsSeen
        ]
    );
