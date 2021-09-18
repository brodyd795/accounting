import React from 'react';
import {UserProvider} from '@auth0/nextjs-auth0';
import Head from 'next/head';

import GlobalStyle from '../components/global-style';
import {Layout} from '../components/layout';

const MyApp = ({Component, pageProps}) => {
    const {user} = pageProps;

    return (
        <>
            <Head>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    name="viewport"
                />
            </Head>
            <UserProvider user={user}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <GlobalStyle />
            </UserProvider>
        </>
    );
};

export default MyApp;
