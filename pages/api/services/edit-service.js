// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sort-keys */
import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {editRepository} from '../repositories/edit-repository';
import {editLogsRepository} from '../repositories/edit-logs-repository';
import {formatDateForDb} from '../../../utils/date-helpers';

const editTransaction = async ({editedTransaction, originalTransaction}) => {
    const {
        amount: newAmount,
        comment: newComment,
        date: newDate,
        fromAccountId: newFromAccountId,
        toAccountId: newToAccountId
    } = editedTransaction;
    const {amount, comment, date, fromAccountId, isMarkedAsSeen, toAccountId, transactionId} = originalTransaction;

    await editRepository({
        editedTransaction: {
            ...editedTransaction,
            date: formatDateForDb(new Date(newDate))
        },
        transactionId
    });
    await editLogsRepository({
        transactionId,
        originalDate: formatDateForDb(new Date(date)),
        originalFromAccountId: fromAccountId,
        originalToAccountId: toAccountId,
        originalAmount: amount,
        originalComment: comment,
        originalIsMarkedAsSeen: isMarkedAsSeen,
        newDate: formatDateForDb(new Date(newDate)),
        newFromAccountId,
        newToAccountId,
        newAmount,
        newComment,
        newIsMarkedAsSeen: isMarkedAsSeen
    });

    return null;
};

export const editService = (props) => withTransactionWrapper(editTransaction, props);
