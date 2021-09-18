import React from 'react';
import NextErrorComponent from 'next/error';
import * as Sentry from '@sentry/nextjs';

const MyError = ({statusCode, hasGetInitialPropsRun, err}) => {
    if (!hasGetInitialPropsRun && err) {
        Sentry.captureException(err);
    }

    return <NextErrorComponent statusCode={statusCode} />;
};

MyError.getInitialProps = async ({res, err, asPath}) => {
    const errorInitialProps = await NextErrorComponent.getInitialProps({
        err,
        res
    });

    // Workaround for https://github.com/vercel/next.js/issues/8592, mark when getInitialProps has run
    errorInitialProps.hasGetInitialPropsRun = true;

    if (err) {
        Sentry.captureException(err);

        await Sentry.flush(2000);

        return errorInitialProps;
    }

    Sentry.captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));

    await Sentry.flush(2000);

    return errorInitialProps;
};

export default MyError;
