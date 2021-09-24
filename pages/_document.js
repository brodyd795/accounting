import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

const APP_NAME = 'Dingel accounting';
const APP_DESCRIPTION = "Our family's personal accounting system";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            // eslint-disable-next-line no-param-reassign
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html dir="ltr" lang="en">
                <Head>
                    <meta content={APP_NAME} name="application-name" />
                    <meta content={APP_NAME} name="apple-mobile-web-app-title" />
                    <meta content={APP_DESCRIPTION} name="description" />
                    <meta content="yes" name="mobile-web-app-capable" />
                    <meta content="yes" name="apple-mobile-web-app-capable" />
                    <meta content="#FFFFFF" name="theme-color" />

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
