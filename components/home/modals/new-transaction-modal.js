import React, {useState} from 'react';
import useSWR from 'swr';

import fetcher from '../../../lib/fetch';

import {TransactionModal} from './transaction-modal';

export const NewTransactionModal = ({setShouldShowModal, shouldShowModal}) => {
    const {data: accounts, error} = useSWR(`/api/controllers/accounts-list-controller`, fetcher);
    const [updateStatusMessage, setUpdateStatusMessage] = useState('');

    if (error) {
        return 'Error!';
    }

    if (!accounts) {
        return "loading";
    }

    const handleSubmit = async (values) => {
        const {
            amount,
            comment,
            date,
            fromAccountName: fromAccount,
            toAccountName: toAccount
        } = values;

        const res = await fetch(`/api/controllers/transactions/new-transaction-controller`, {
            body: JSON.stringify({
                transaction: {
                    amount: amount * 100,
                    comment,
                    date: new Date(date),
                    fromAccountId: fromAccount.accountId,
                    toAccountId: toAccount.accountId
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

    return (
        <TransactionModal
            accounts={accounts}
            handleSubmit={handleSubmit}
            initialValues={{
                amount: undefined,
                comment: '',
                date: new Date(),
                fromAccountName: undefined,
                toAccountName: undefined
            }}
            setShouldShowModal={setShouldShowModal}
            shouldShowModal={shouldShowModal}
            title={'New Transaction'}
            // transactionBeingEdited={transactionBeingEdited}
            updateStatusMessage={updateStatusMessage}
        />
    )
};
