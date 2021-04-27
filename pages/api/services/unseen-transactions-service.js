import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {unseenTransactionsRepository} from '../repositories/unseen-transactions-repository';

const unseenTransactions = async () => {
    const data = await unseenTransactionsRepository();

    return data;
};

export const unseenTransactionsService = (props) => withTransactionWrapper(unseenTransactions, props);
