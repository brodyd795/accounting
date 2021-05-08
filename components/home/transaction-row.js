import React, {useState} from 'react';

import {useDemo} from '../../hooks/use-demo';
import {formatDateForDb} from '../../utils/date-helpers';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';

import {BlurrableTd} from './blurrable-td';
import {TransactionEditModal} from './modals/transaction-edit-modal';

export const TransactionRow = ({transaction}) => {
    const {
        transactionId,
        date: dateString,
        amount,
        comment,
        fromAccountName,
        toAccountName,
        isMarkedAsSeen
    } = transaction;
    const {isDemo} = useDemo();
    const [hasBeenSeen, setHasBeenSeen] = useState(isMarkedAsSeen);
    const [shouldShowModal, setShouldShowModal] = useState(false);
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
        setShouldShowModal(true);
    };

    return (
        <tr>
            <td>{date.toDateString()}</td>
            <td>{cleanAccountNameOrCategoryForUI(fromAccountName)}</td>
            <td>{cleanAccountNameOrCategoryForUI(toAccountName)}</td>
            <BlurrableTd isDemo={isDemo}>{amount}</BlurrableTd>
            <BlurrableTd isDemo={isDemo}>{comment}</BlurrableTd>
            <td>
                <button onClick={markTransactionAsSeen} type={'button'}>
                    {'Mark as seen'}
                </button>
            </td>
            <td>
                <button onClick={editTransaction} type={'button'}>
                    {'Edit'}
                </button>
            </td>
            <td>
                <button onClick={deleteTransaction} type={'button'}>
                    {'Delete'}
                </button>
            </td>
            {shouldShowModal && (
                <TransactionEditModal
                    setShouldShowModal={setShouldShowModal}
                    shouldShowModal={shouldShowModal}
                    transactionBeingEdited={transaction}
                />
            )}
        </tr>
    );
};
