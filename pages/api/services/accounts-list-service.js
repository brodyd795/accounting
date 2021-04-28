import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {accountsListRepository} from '../repositories/accounts-list-repository';

const accountsList = async () => {
    const data = await accountsListRepository();

    return data;
};

export const accountsListService = (props) => withTransactionWrapper(accountsList, props);
