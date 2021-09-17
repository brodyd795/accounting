import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {
    subscribeRepository,
    unsubscribeRepository,
    getSubscriptionsRepository
} from '../repositories/subscription-repository';

const subscribe = ({subscription}) => subscribeRepository(subscription);
const unsubscribe = ({subscription}) => unsubscribeRepository(subscription);
const getSubscriptions = () => getSubscriptionsRepository();

export const subscribeService = (props) => withTransactionWrapper(subscribe, props);
export const unsubscribeService = (props) => withTransactionWrapper(unsubscribe, props);
export const getSubscriptionsService = (props) => withTransactionWrapper(getSubscriptions, props);
