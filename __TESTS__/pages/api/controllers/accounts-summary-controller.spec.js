import Chance from 'chance';

import accountsSummaryController from "../../../../pages/api/controllers/accounts-summary-controller";
import {accountsSummaryService} from "../../../../pages/api/services/accounts-summary-service";

jest.mock('../../../../pages/api/services/accounts-summary-service');

const chance = new Chance();

describe('accounts-summary-controller', () => {
    let expectedData,
        expectedReq,
        expectedRes;

    beforeEach(() => {
        expectedData = {
            [chance.word()]: chance.word()
        };
        expectedReq = jest.fn();
        expectedRes = {
            json: jest.fn(),
            status: jest.fn(),
            end: jest.fn()
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
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
                status: chance.natural(),
                message: chance.string()
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