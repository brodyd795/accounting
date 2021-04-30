// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sort-keys */
import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {deleteRepository} from '../repositories/delete-repository';
import {editLogsRepository} from '../repositories/edit-logs-repository';

const deleteTransaction = async ({transaction}) => {
    const {transactionId, date, fromAccountId, toAccountId, amount, comment, isMarkedAsSeen} = transaction;

    await deleteRepository({transactionId});
    await editLogsRepository({
        transactionId,
        originalDate: date,
        originalFromAccountId: fromAccountId,
        originalToAccountId: toAccountId,
        originalAmount: amount,
        originalComment: comment,
        originalIsMarkedAsSeen: isMarkedAsSeen,
        newDate: null,
        newFromAccountId: null,
        newToAccountId: null,
        newAmount: null,
        newComment: null,
        newIsMarkedAsSeen: null
    });

    return null;
};

export const deleteService = (props) => withTransactionWrapper(deleteTransaction, props);
