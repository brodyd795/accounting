import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {subscribeRepository, unsubscribeRepository} from '../repositories/subscription-repository';

const subscribe = async ({subscription}) => {
    return subscribeRepository(subscription);
};

const unsubscribe = async ({subscription}) => {
    return unsubscribeRepository(subscription);
};

export const subscribeService = (props) => withTransactionWrapper(subscribe, props);

export const unsubscribeService = (props) => withTransactionWrapper(unsubscribe, props);
