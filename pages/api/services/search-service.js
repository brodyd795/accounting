import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {searchRepository} from '../repositories/search-repository';

const search = ({input}) => {
    const {comment, fromAccount, fromAmount, fromDate, toAccount, toAmount, toDate} = input;

    const inputWithDefaultValues = {
        comment: comment !== undefined ? `%${comment}%` : '%',
        fromAccount: fromAccount !== undefined ? fromAccount : '[0-9]',
        fromAmount: fromAmount !== undefined ? fromAmount : 0,
        fromDate: fromDate !== undefined ? fromDate : '2000-01-01',
        toAccount: toAccount !== undefined ? toAccount : '[0-9]',
        toAmount: toAmount !== undefined ? toAmount : 9999999,
        toDate: toDate !== undefined ? toDate : '3000-01-01'
    };

    return searchRepository(inputWithDefaultValues);
};

export const searchService = (props) => withTransactionWrapper(search, props);
