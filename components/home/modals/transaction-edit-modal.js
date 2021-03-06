import React, {useState} from 'react';
import useSWR from 'swr';

import fetcher from '../../../lib/fetch';

import {TransactionModal} from './transaction-modal';

export const TransactionEditModal = ({setShouldShowModal, shouldShowModal, transactionBeingEdited}) => {
    const {data: accounts, error} = useSWR(`/api/controllers/accounts-list-controller`, fetcher);
    const [updateStatusMessage, setUpdateStatusMessage] = useState('');
    const {amount, comment, date, fromAccountId, isMarkedAsSeen, toAccountId, transactionId} = transactionBeingEdited;

    if (error) {
        return 'Error!';
    }

    if (!accounts) {
        return null;
    }

    const handleSubmit = async (values) => {
        const {
            amount: newAmount,
            comment: newComment,
            date: newDate,
            fromAccountName: newFromAccount,
            toAccountName: newToAccount
        } = values;
        const res = await fetch(`/api/controllers/transactions/edit-controller`, {
            body: JSON.stringify({
                editedTransaction: {
                    amount: newAmount * 100,
                    comment: newComment,
                    date: new Date(newDate),
                    fromAccountId: newFromAccount.accountId,
                    toAccountId: newToAccount.accountId
                },
                originalTransaction: {
                    amount,
                    comment,
                    date: new Date(date),
                    fromAccountId,
                    isMarkedAsSeen,
                    toAccountId,
                    transactionId
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });

        if (res.status === 200) {
            setUpdateStatusMessage('Success!');
            setTimeout(() => {
                setShouldShowModal(false);
            }, 1500);
        } else {
            setUpdateStatusMessage('Sorry, something went wrong.');
        }
    };

    const flatAccounts = accounts.reduce((acc, current) => [...acc, current.options], []).flat();
    const fromAccountOption = flatAccounts.find((account) => account.accountId === fromAccountId);
    const toAccountOption = flatAccounts.find((account) => account.accountId === toAccountId);

    return (
        <TransactionModal
            accounts={accounts}
            handleSubmit={handleSubmit}
            initialValues={{
                amount: amount / 100,
                comment,
                date: new Date(date),
                fromAccountName: fromAccountOption,
                toAccountName: toAccountOption
            }}
            setShouldShowModal={setShouldShowModal}
            shouldShowModal={shouldShowModal}
            title={'Edit Transaction'}
            transactionBeingEdited={transactionBeingEdited}
            updateStatusMessage={updateStatusMessage}
        />
    );
};
