import {formatDateForDb} from "../../utils/date-helpers";

describe('date-helpers', () => {
    describe('formatDateForDb', () => {
        test('should format date for db', () => {
            const expectedDate = new Date(2020, 2, 1);

            const result = formatDateForDb(expectedDate);

            expect(result).toBe('2020-03-01');
        });
    });
});