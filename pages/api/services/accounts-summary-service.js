import {accountsSummaryRepository} from '../repositories/accounts-summary-repository';

export const accountsSummaryService = async () => {
    const data = await accountsSummaryRepository();

    return data;
};
