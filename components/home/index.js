import React from 'react';
import useSWR from 'swr';

import {Layout} from "../layout";
import fetch from '../../lib/fetch';

export const Home = () => {
    const { data, error } = useSWR('/api/controllers/accounts-summary-controller', fetch);
    
    if (error) {
        return <div>{'Error!'}</div>
    }

    if (!data) {
        return <div>{'Loading...'}</div>
    }

    return (
        <Layout>
            <div>{'Home here'}</div>
            <div>
                {data.map((account) => <div key={account.accountId}>
                    {account.balance}
                </div>)}
            </div>
        </Layout>
    )
};
