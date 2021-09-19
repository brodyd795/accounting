import React from 'react';
import useSWR from 'swr';

import fetcher from '../../lib/fetch';

import {TransactionsTableSkeleton} from './skeletons';
import {TransactionsTable} from './transactions-table';

const header = 'Unseen Transactions';

export const UnseenTransactionsTable = () => {
    const {data, error} = useSWR('/api/controllers/unseen-transactions-controller', fetcher);

    if (error) {
        return <div>{'Error!'}</div>;
    }

    if (!data) {
        return <TransactionsTableSkeleton header={header} />;
    }

    return (
        <TransactionsTable data={data} header={header} hideSeenTransactions noResultsText={"You're all caught up!"} />
    );
};
