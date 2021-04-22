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
            <table>
                <tr>
                    <th>{'Category'}</th>
                    <th>{'Account Name'}</th>
                    <th>{'Balance'}</th>
                </tr>
                {data.map((account) => 
                    <tr key={account.accountId}>
                        <td>{account.category}</td>
                        <td>{account.accountName}</td>
                        <td>{account.balance}</td>
                    </tr>
                )}
            </table>
        </Layout>
    )
};
