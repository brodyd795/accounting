import React from 'react';
import {UserProvider} from '@auth0/nextjs-auth0';

import GlobalStyle from '../components/global-style';
import {Layout} from '../components/layout';
import {init} from '../lib/sentry';

init();

const MyApp = ({Component, pageProps}) => {
    const {user} = pageProps;

    return (
        <UserProvider user={user}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <GlobalStyle />
        </UserProvider>
    )
};

export default MyApp;
