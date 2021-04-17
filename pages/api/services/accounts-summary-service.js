import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {accountsSummaryRepository} from '../repositories/accounts-summary-repository';

const accountsSummary = async (props) => {
    const data = await accountsSummaryRepository(props);

    return data;
};

export const accountsSummaryService = (props) => withTransactionWrapper(accountsSummary, props);
