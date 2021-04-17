import Chance from 'chance';

import {accountsSummaryRepository} from "../../../../pages/api/repositories/accounts-summary-repository";
import {withTransactionWrapper} from "../../../../pages/api/repositories/transaction-wrapper-repository";
import {accountsSummaryService} from "../../../../pages/api/services/accounts-summary-service";

jest.mock('../../../../pages/api/repositories/accounts-summary-repository');
jest.mock('../../../../pages/api/repositories/transaction-wrapper-repository');

const chance = new Chance();

describe('accounts-summary-service', () => {
    let expectedProps,
        expectedResults;

    beforeEach(() => {
        expectedProps = {};
        expectedResults = chance.word();

        accountsSummaryRepository.mockResolvedValue(expectedResults);
        withTransactionWrapper.mockImplementation(async (fn, props) => fn(props));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should call with transaction wrapper', async () => {
        await accountsSummaryService(expectedProps);

        expect(withTransactionWrapper).toHaveBeenCalledTimes(1);
        expect(withTransactionWrapper).toHaveBeenCalledWith(expect.anything(), expectedProps);
    });

    test('should call repo', async () => {
        await accountsSummaryService(expectedProps);

        expect(accountsSummaryRepository).toHaveBeenCalledTimes(1);
        expect(accountsSummaryRepository).toHaveBeenCalledWith(expectedProps);
    });

    test('should return results', async () => {
        const result = await accountsSummaryService(expectedProps);

        expect(result).toStrictEqual(expectedResults);
    });
});