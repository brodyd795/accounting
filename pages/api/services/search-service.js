import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {searchRepository} from '../repositories/search-repository';

const search = async ({input}) => {
    const data = await searchRepository({input});

    return data;
};

export const searchService = (props) => withTransactionWrapper(search, props);
