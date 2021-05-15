import React from 'react';
import useSWR from 'swr';

import fetcher from '../../lib/fetch';

import {TransactionsTable} from './transactions-table';

export const UnseenTransactionsTable = () => {
    const {data, error} = useSWR('/api/controllers/unseen-transactions-controller', fetcher);

    if (error) {
        return <div>{'Error!'}</div>;
    }

    if (!data) {
        return <div>{'Loading transactions...'}</div>;
    }

    return <TransactionsTable data={data} header={'Unseen Transactions'} noResultsText={"You're all caught up!"} />;
};
