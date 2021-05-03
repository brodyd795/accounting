import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {newTransactionRepository} from '../repositories/new-transaction-repository';
import {formatDateForDb} from '../../../utils/date-helpers';

const newTransaction = async ({transaction}) => {
    const {date, fromAccountId, toAccountId, amount, comment} = transaction;

    await newTransactionRepository({
        amount,
        comment,
        date: formatDateForDb(new Date(date)),
        fromAccountId,
        isMarkedAsSeen: true,
        toAccountId
    });

    return null;
};

export const newTransactionService = (props) => withTransactionWrapper(newTransaction, props);
