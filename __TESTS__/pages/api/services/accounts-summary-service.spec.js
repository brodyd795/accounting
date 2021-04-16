import {accountsSummaryRepository} from "../../../../pages/api/repositories/accounts-summary-repository";
import {accountsSummaryService} from "../../../../pages/api/services/accounts-summary-service";

jest.mock('../../../../pages/api/repositories/accounts-summary-repository');

describe('accounts-summary-service', () => {
    beforeEach(() => {
        accountsSummaryRepository.mockResolvedValue('foo');
    });
    test('should call repo', async () => {
        const result = await accountsSummaryService();

        expect(result).toStrictEqual('foo');
    });
});