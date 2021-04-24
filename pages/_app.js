import React from 'react';
import {UserProvider} from '@auth0/nextjs-auth0';

import '../styles/globals.css';

const MyApp = ({Component, pageProps}) => {
    const {user} = pageProps;

    return (
        <UserProvider user={user}>
            <Component {...pageProps} />
        </UserProvider>
    )
};

export default MyApp;
