import {cleanAccountNameForUI} from "../../utils/string-helpers";

describe('string-helpers', () => {
    describe('cleanAccountNameForUI', () => {
        test('should clean account name', () => {
            const result = cleanAccountNameForUI('foo_bar');
    
            expect(result).toBe('foo bar');
        });
    });
});