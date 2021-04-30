import startOfMonth from 'date-fns/startOfMonth';
import addMonths from 'date-fns/addMonths';

import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {accountsSummaryRepository} from '../repositories/accounts-summary-repository';
import {formatDateForDb} from '../../../utils/date-helpers';

const accountsSummary = async ({date}) => {
    const startDate = startOfMonth(date);
    const endDate = addMonths(startDate, 1);

    const data = await accountsSummaryRepository({
        endDate: formatDateForDb(endDate),
        startDate: formatDateForDb(startDate)
    });

    return data;
};

export const accountsSummaryService = (props) => withTransactionWrapper(accountsSummary, props);
