import Chance from 'chance';
import startOfMonth from 'date-fns/startOfMonth';
import addMonths from 'date-fns/addMonths';

import {accountsSummaryRepository} from '../../../../pages/api/repositories/accounts-summary-repository';
import {withTransactionWrapper} from '../../../../pages/api/repositories/transaction-wrapper-repository';
import {accountsSummaryService} from '../../../../pages/api/services/accounts-summary-service';


jest.mock('../../../../pages/api/repositories/accounts-summary-repository');
jest.mock('../../../../pages/api/repositories/transaction-wrapper-repository');
jest.mock('date-fns/startOfMonth');
jest.mock('date-fns/addMonths');

const chance = new Chance();

describe('accounts-summary-service', () => {
    let expectedProps, expectedResults, expectedStartDate, expectedEndDate;

    beforeEach(() => {
        expectedProps = {
            date: chance.date()
        };
        expectedResults = chance.word();
        expectedStartDate = chance.date();
        expectedEndDate = chance.date();

        accountsSummaryRepository.mockResolvedValue(expectedResults);
        withTransactionWrapper.mockImplementation(async (fn, props) => fn(props));
        startOfMonth.mockReturnValue(expectedStartDate);
        addMonths.mockReturnValue(expectedEndDate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should call with transaction wrapper', async () => {
        await accountsSummaryService(expectedProps);

        expect(withTransactionWrapper).toHaveBeenCalledTimes(1);
        expect(withTransactionWrapper).toHaveBeenCalledWith(expect.anything(), expectedProps);
    });

    test('should calculate start and end dates', async () => {
        await accountsSummaryService(expectedProps);

        expect(startOfMonth).toHaveBeenCalledTimes(1);
        expect(startOfMonth).toHaveBeenCalledWith(expectedProps.date);
        expect(addMonths).toHaveBeenCalledTimes(1);
        expect(addMonths).toHaveBeenCalledWith(expectedStartDate, 1);
    });

    test('should call repo', async () => {
        await accountsSummaryService(expectedProps);

        expect(accountsSummaryRepository).toHaveBeenCalledTimes(1);
        expect(accountsSummaryRepository).toHaveBeenCalledWith({
            endDate: expectedEndDate,
            startDate: expectedStartDate
        });
    });

    test('should return results', async () => {
        const result = await accountsSummaryService(expectedProps);

        expect(result).toStrictEqual(expectedResults);
    });
});
