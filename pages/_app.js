import React from 'react';

import GlobalStyle from '../components/global-style';
import { Layout } from '../components/layout';

const MyApp = ({Component, pageProps}) => 
    <>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        <GlobalStyle />
    </>;

export default MyApp;
