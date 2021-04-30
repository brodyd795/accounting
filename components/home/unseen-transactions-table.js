import React, {useState} from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

import fetcher from '../../lib/fetch';
import {formatDateForDb} from '../../utils/date-helpers';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';

import {TransactionEditModal} from './modals/transaction-edit-modal';

const StyledUnseenTransactionsContainer = styled.div`
    margin-top: 40px;
`;

const StyledTableHeader = styled.td`
    font-weight: bold;
`;

const TransactionRow = ({transaction}) => {
    const {transactionId, date: dateString, amount, comment, fromAccountName, toAccountName, isMarkedAsSeen} = transaction;
    const [hasBeenSeen, setHasBeenSeen] = useState(isMarkedAsSeen);
    const [shouldShowEditModal, setShouldShowEditModal] = useState(false);
    const date = new Date(dateString);

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

            alert('Success!');
        } else {
            alert('Error!');
        }
    };

    const deleteTransaction = async () => {
        const confirmation = confirm('Are you sure you want to delete this transaction? This cannot be undone.');

        if (confirmation) {
            const res = await fetch(`/api/controllers/transactions/delete-controller`, {
                body: JSON.stringify({
                    transaction: {
                        ...transaction,
                        date: formatDateForDb(new Date(date))
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
    
            if (res.ok) {
                setHasBeenSeen(true);
    
                alert('Successful delete!');
            } else {
                alert('Error while deleting...');
            }
        }
    };

    const editTransaction = () => {
        setShouldShowEditModal(true);
    };

    return (
        <tr>
            <td>{date.toDateString()}</td>
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
            <td>
                <button
                    onClick={editTransaction}
                    type={'button'}
                >
                    {'Edit'}
                </button>
            </td>
            <td>
                <button
                    onClick={deleteTransaction}
                    type={'button'}
                >
                    {'Delete'}
                </button>
            </td>
            {shouldShowEditModal && 
                <TransactionEditModal
                    setShouldShowEditModal={setShouldShowEditModal}
                    shouldShowEditModal={shouldShowEditModal}
                    transactionBeingEdited={transaction}
                />}
        </tr>
    )
}

export const UnseenTransactionsTable = () => {
    const {data, error} = useSWR(`/api/controllers/unseen-transactions-controller`, fetcher);
    
    if (error) {
        return <div>{'Error!'}</div>
    }

    if (!data) {
        return <div>{'Loading unseen transactions...'}</div>
    }

    return (
        <StyledUnseenTransactionsContainer>
            <h2>{'Unseen Transactions'}</h2>
            {data.length ?
                <table>
                    <thead>
                        <tr>
                            <StyledTableHeader>{'Date'}</StyledTableHeader>
                            <StyledTableHeader>{'From'}</StyledTableHeader>
                            <StyledTableHeader>{'To'}</StyledTableHeader>
                            <StyledTableHeader>{'Amount'}</StyledTableHeader>
                            <StyledTableHeader>{'Comment'}</StyledTableHeader>
                        </tr>
                    </thead>
                    {data.map((transaction) => (
                        <TransactionRow key={transaction.transactionId} transaction={transaction} />
                    ))}
                </table>
                :
                'You\'re all caught up!'}
        </StyledUnseenTransactionsContainer>
    )
};
