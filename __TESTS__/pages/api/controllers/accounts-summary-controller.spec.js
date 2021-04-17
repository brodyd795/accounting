import Chance from 'chance';

import accountsSummaryController from '../../../../pages/api/controllers/accounts-summary-controller';
import {accountsSummaryService} from '../../../../pages/api/services/accounts-summary-service';

jest.mock('../../../../pages/api/services/accounts-summary-service');

const chance = new Chance();

describe('accounts-summary-controller', () => {
    let expectedData, expectedReq, expectedRes, expectedDate;

    beforeEach(() => {
        expectedData = {
            [chance.word()]: chance.word()
        };
        expectedDate = chance.date();
        expectedReq = {
            body: {
                date: expectedDate
            }
        };
        expectedRes = {
            json: jest.fn(),
            status: jest.fn().mockImplementation(() => ({
                end: jest.fn()
            }))
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should call service', async () => {
        await accountsSummaryController(expectedReq, expectedRes);

        expect(accountsSummaryService).toHaveBeenCalledTimes(1);
        expect(accountsSummaryService).toHaveBeenCalledWith({
            date: expectedDate
        });
    });

    test('should return data', async () => {
        accountsSummaryService.mockResolvedValue(expectedData);

        await accountsSummaryController(expectedReq, expectedRes);

        expect(expectedRes.json).toHaveBeenCalledTimes(1);
        expect(expectedRes.json).toHaveBeenCalledWith(expectedData);
    });

    describe('on error', () => {
        test('should respond with error', async () => {
            const expectedError = {
                message: chance.string(),
                status: chance.natural()
            };

            accountsSummaryService.mockRejectedValue(expectedError);

            await accountsSummaryController(expectedReq, expectedRes);

            //  TypeError: Cannot read property 'end' of undefined
            expect(expectedRes.status).toHaveBeenCalledTimes(1);
            expect(expectedRes.status).toHaveBeenCalledWith(expectedError.status);
        });

        test('should respond with 500 code if no error status', async () => {
            const expectedError = {
                message: chance.string()
            };

            accountsSummaryService.mockRejectedValue(expectedError);

            await accountsSummaryController(expectedReq, expectedRes);

            //  TypeError: Cannot read property 'end' of undefined
            expect(expectedRes.status).toHaveBeenCalledTimes(1);
            expect(expectedRes.status).toHaveBeenCalledWith(500);
        });
    });
});
