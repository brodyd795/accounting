import React, {useState} from 'react';
import useSWR from 'swr';

import fetch from '../../lib/fetch';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';

export const UnseenTransactionsTable = () => {
    const {data, error} = useSWR(`/api/controllers/unseen-transactions-controller`, fetch);
    
    if (error) {
        return <div>{'Error!'}</div>
    }

    if (!data) {
        return <div>{'Loading unseen transactions...'}</div>
    }

    if (!data.length) {
        return 'Nothing to see here!';
    }

    return (
        <>
            <div>{'Unseen Transactions'}</div>
            <table>
                <thead>
                    <tr>
                        <td>{'Date'}</td>
                        <td>{'From'}</td>
                        <td>{'To'}</td>
                        <td>{'Amount'}</td>
                        <td>{'Comment'}</td>
                    </tr>
                </thead>
                {data.map(({transactionId, date, amount, comment, fromAccountName, toAccountName}) => (
                    <tr key={transactionId}>
                        <td>{date}</td>
                        <td>{cleanAccountNameOrCategoryForUI(fromAccountName)}</td>
                        <td>{cleanAccountNameOrCategoryForUI(toAccountName)}</td>
                        <td>{amount}</td>
                        <td>{comment}</td>
                    </tr>
                ))}
            </table>
        </>
    )
};
