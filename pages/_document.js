import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

const APP_NAME = 'Dingel accounting';
const APP_DESCRIPTION = "Our family's personal accounting system";

export default class extends Document {
    static getInitialProps(ctx) {
        return Document.getInitialProps(ctx);
    }

    render() {
        return (
            <Html dir="ltr" lang="en">
                <Head>
                    <meta content={APP_NAME} name="application-name" />
                    <meta content="yes" name="apple-mobile-web-app-capable" />
                    <meta content="default" name="apple-mobile-web-app-status-bar-style" />
                    <meta content={APP_NAME} name="apple-mobile-web-app-title" />
                    <meta content={APP_DESCRIPTION} name="description" />
                    <meta content="telephone=no" name="format-detection" />
                    <meta content="yes" name="mobile-web-app-capable" />
                    <meta content="#FFFFFF" name="theme-color" />
                    <meta
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                        name="viewport"
                    />

                    <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
                    <link href="/manifest.json" rel="manifest" />
                    <link href="/favicon.ico" rel="shortcut icon" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
