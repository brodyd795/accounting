const {withSentryConfig} = require('@sentry/nextjs');
const withPWA = require('next-pwa');

module.exports = withSentryConfig(
    withPWA({
        pwa: {
            dest: 'public'
        }
    })
);
