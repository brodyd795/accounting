import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {markAsSeenRepository} from '../repositories/mark-as-seen-repository';

const markAsSeen = async ({transactionId}) => {
    const data = await markAsSeenRepository({transactionId});

    return data;
};

export const markAsSeenService = (props) => withTransactionWrapper(markAsSeen, props);
