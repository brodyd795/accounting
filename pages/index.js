import React from 'react';
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';

import {ADMIN_EMAILS} from '../enums/admin-emails';
import {Home} from '../components/home';

const Index = () => {
    const {user, error, isLoading} = useUser();

    if (error) {
        return 'Error';
    }

    if (isLoading) {
        return 'Loading user profile...';
    }

    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
        return 'Unauthorized';
    }

    return <Home />
};

export const getServerSideProps = withPageAuthRequired();

export default Index;
