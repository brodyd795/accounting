import React, {useState} from 'react';
import useSWR from 'swr';

import fetch from '../../lib/fetch';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';

const TransactionRow = ({transaction}) => {
    const {transactionId, date, amount, comment, fromAccountName, toAccountName, isMarkedAsSeen} = transaction;
    const [hasBeenSeen, setHasBeenSeen] = useState(isMarkedAsSeen);

    if (hasBeenSeen) {
        return null;
    }

    const markTransactionAsSeen = async () => {
        const res = await fetch(`/api/controllers/transactions/mark-as-seen-controller`, {
            body: JSON.stringify({
                transactionId
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });

        if (res.ok) {
            setHasBeenSeen(true);
            console.log('success!')
        } else {
            console.log('error!')
        }
    }

    return (
        <tr>
            <td>{date}</td>
            <td>{cleanAccountNameOrCategoryForUI(fromAccountName)}</td>
            <td>{cleanAccountNameOrCategoryForUI(toAccountName)}</td>
            <td>{amount}</td>
            <td>{comment}</td>
            <td>
                <button
                    onClick={markTransactionAsSeen}
                    type={'button'}
                >
                    {'Mark as seen'}
                </button>
            </td>
        </tr>
    )
}

export const UnseenTransactionsTable = () => {
    const {data, error} = useSWR(`/api/controllers/unseen-transactions-controller`, fetch);
    
    if (error) {
        return <div>{'Error!'}</div>
    }

    if (!data) {
        return <div>{'Loading unseen transactions...'}</div>
    }

    return (
        <>
            <div>{'Unseen Transactions'}</div>
            {data.length ?
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
                    {data.map((transaction) => (
                        <TransactionRow key={transaction.transactionId} transaction={transaction} />
                    ))}
                </table>
                :
                'Nothing to see here!'}
        </>
    )
};
