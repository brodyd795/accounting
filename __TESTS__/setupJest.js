expect.extend({
    toBeIgnoringWhitespace(received, expected) {
        if (received.replace(/\s+/g, ' ') === expected.replace(/\s+/g, ' ')) {
            return {
                message: () => 'Hurrah!',
                pass: true
            }
        }

        return {
            message: () => `Expected '${received}' to equal '${expected}' when ignoring whitespace`,
            pass: false
        }
    },
});
