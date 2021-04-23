import Chance from 'chance';

import accountsSummaryController from '../../../../pages/api/controllers/accounts-summary-controller';
import {accountsSummaryService} from '../../../../pages/api/services/accounts-summary-service';

jest.mock('../../../../pages/api/services/accounts-summary-service');

const chance = new Chance();

describe('accounts-summary-controller', () => {
    let expectedData, expectedReq, expectedRes, expectedDate, expectedJsonStub, expectedEndStub, expectedStatusStub;

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
        expectedJsonStub = jest.fn();
        expectedEndStub = jest.fn();
        expectedStatusStub = jest.fn().mockImplementation(() => ({
            end: expectedEndStub
        }));
        expectedRes = {
            json: expectedJsonStub,
            status: expectedStatusStub
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

        expect(expectedJsonStub).toHaveBeenCalledTimes(1);
        expect(expectedJsonStub).toHaveBeenCalledWith(expectedData);
    });

    describe('on error', () => {
        test('should respond with error', async () => {
            const expectedError = {
                message: chance.string(),
                status: chance.natural()
            };

            accountsSummaryService.mockRejectedValue(expectedError);

            await accountsSummaryController(expectedReq, expectedRes);

            expect(expectedStatusStub).toHaveBeenCalledTimes(1);
            expect(expectedStatusStub).toHaveBeenCalledWith(expectedError.status);
            expect(expectedEndStub).toHaveBeenCalledTimes(1);
            expect(expectedEndStub).toHaveBeenCalledWith(expectedError.message);
        });

        test('should respond with 500 code if no error status', async () => {
            const expectedError = {
                message: chance.string()
            };

            accountsSummaryService.mockRejectedValue(expectedError);

            await accountsSummaryController(expectedReq, expectedRes);

            expect(expectedStatusStub).toHaveBeenCalledTimes(1);
            expect(expectedStatusStub).toHaveBeenCalledWith(500);
            expect(expectedEndStub).toHaveBeenCalledTimes(1);
            expect(expectedEndStub).toHaveBeenCalledWith(expectedError.message);
        });
    });
});
