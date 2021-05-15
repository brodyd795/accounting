import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {searchRepository} from '../repositories/search-repository';

const search = async ({input}) => {
    const {comment, fromAccount, fromAmount, fromDate, toAccount, toAmount, toDate} = input;

    const inputWithDefaultValues = {
        comment: comment !== undefined ? `%${comment}%` : '%',
        fromAccount: fromAccount !== undefined ? fromAccount : '[0-9]',
        fromAmount: fromAmount !== undefined ? fromAmount : 0,
        fromDate: fromDate !== undefined ? fromDate : '2000-01-01', // extract this date into an enum
        toAccount: toAccount !== undefined ? toAccount : '[0-9]',
        toAmount: toAmount !== undefined ? toAmount : 9999999,
        toDate: toDate !== undefined ? toDate : '3000-01-01' // and this one
    };
    console.log(`inputWithDefaultValues`, inputWithDefaultValues);
    const data = await searchRepository(inputWithDefaultValues);
    console.log(`data`, data);

    return data;
};

export const searchService = (props) => withTransactionWrapper(search, props);
