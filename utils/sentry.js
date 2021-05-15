import * as Sentry from '@sentry/node';
import {RewriteFrames} from '@sentry/integrations';

export const init = () => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        const integrations = [];

        if (process.env.NEXT_IS_SERVER === 'true' && process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR) {
            // For Node.js, rewrite Error.stack to use relative paths, so that source
            // maps starting with ~/_next map to files in Error.stack with path
            // app:///_next
            integrations.push(
                new RewriteFrames({
                    iteratee: (frame) => {
                        // eslint-disable-next-line no-param-reassign
                        frame.filename = frame.filename.replace(
                            process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
                            'app:///'
                        );
                        // eslint-disable-next-line no-param-reassign
                        frame.filename = frame.filename.replace('.next', '_next');

                        return frame;
                    }
                })
            );
        }

        Sentry.init({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
            enabled: process.env.VERCEL_ENV !== 'development',
            integrations,
            release: process.env.NEXT_PUBLIC_COMMIT_SHA
        });
    }
};
