import React, {useState} from 'react';
import useSWR from 'swr';

import {useDemo} from '../../../hooks/use-demo';
import fetcher from '../../../lib/fetch';
import {getRandomDollarAmount} from '../../../utils/demo-helpers';

import {TransactionModal} from './transaction-modal';

export const TransactionEditModal = ({setTransaction, setShouldShowModal, shouldShowModal, transactionBeingEdited}) => {
    const {data: accounts, error} = useSWR(`/api/controllers/accounts-list-controller`, fetcher);
    const [updateStatusMessage, setUpdateStatusMessage] = useState('');
    const {amount, comment, date, fromAccountId, isMarkedAsSeen, toAccountId, transactionId} = transactionBeingEdited;
    const {isDemo} = useDemo();

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
            toAccountName: newToAccount,
            isMarkedAsSeen: newIsMarkedAsSeen
        } = values;
        const res = await fetch(`/api/controllers/transactions/edit-controller`, {
            body: JSON.stringify({
                editedTransaction: {
                    amount: newAmount * 100,
                    comment: newComment,
                    date: new Date(newDate),
                    fromAccountId: newFromAccount.accountId,
                    isMarkedAsSeen: newIsMarkedAsSeen,
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
            setTransaction({
                amount: newAmount * 100,
                comment: newComment,
                date: new Date(newDate),
                fromAccountCategory: newFromAccount.category,
                fromAccountId: newFromAccount.accountId,
                fromAccountName: newFromAccount.label,
                isMarkedAsSeen: newIsMarkedAsSeen,
                toAccountCategory: newToAccount.category,
                toAccountId: newToAccount.accountId,
                toAccountName: newToAccount.label,
                transactionId
            });
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
                amount: isDemo ? getRandomDollarAmount() : amount / 100,
                comment,
                date: new Date(date),
                fromAccountName: fromAccountOption,
                isMarkedAsSeen: true,
                toAccountName: toAccountOption
            }}
            setShouldShowModal={setShouldShowModal}
            shouldShowModal={shouldShowModal}
            title={'Edit Transaction'}
            updateStatusMessage={updateStatusMessage}
        />
    );
};
