import startOfMonth from 'date-fns/startOfMonth';
import addMonths from 'date-fns/addMonths';

import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {accountsSummaryRepository} from '../repositories/accounts-summary-repository';


const accountsSummary = async ({date}) => {
    const startDate = startOfMonth(date);
    const endDate = addMonths(startDate, 1);

    const data = await accountsSummaryRepository({
        endDate,
        startDate
    });

    return data;
};

export const accountsSummaryService = (props) => withTransactionWrapper(accountsSummary, props);
