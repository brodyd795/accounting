expect.extend({
    // eslint-disable-next-line get-off-my-lawn/prefer-arrow-functions
    toBeIgnoringWhitespace(received, expected) {
        if (received.replace(/\s+/gu, ' ') === expected.replace(/\s+/gu, ' ')) {
            return {
                message: () => 'Hurrah!',
                pass: true
            };
        }

        return {
            message: () => `Expected '${received}' to equal '${expected}' when ignoring whitespace`,
            pass: false
        };
    }
});
