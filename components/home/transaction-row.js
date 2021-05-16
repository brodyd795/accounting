/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import styled from 'styled-components';

import {useDemo} from '../../hooks/use-demo';
import {formatDateForDb} from '../../utils/date-helpers';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';

import {BlurrableTd} from './blurrable-td';
import {TransactionEditModal} from './modals/transaction-edit-modal';

const BorderlessTd = styled.td`
    border: none;
`;

const StyledButton = styled.button`
    margin: 0 4px;
`;

export const TransactionRow = ({transaction, hideSeenTransactions}) => {
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

    if (hasBeenSeen && hideSeenTransactions) {
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

    const amountInDollars = amount / 100;
    const cleanAmount = `$ ${amountInDollars.toLocaleString()}`;

    return (
        <tr>
            <td>{date.toDateString()}</td>
            <td>{cleanAccountNameOrCategoryForUI(fromAccountName)}</td>
            <td>{cleanAccountNameOrCategoryForUI(toAccountName)}</td>
            <BlurrableTd isDemo={isDemo}>{cleanAmount}</BlurrableTd>
            <BlurrableTd isDemo={isDemo}>{comment}</BlurrableTd>
            <BorderlessTd>
                <StyledButton onClick={markTransactionAsSeen} type={'button'}>
                    {'Mark as seen'}
                </StyledButton>
                <StyledButton onClick={editTransaction} type={'button'}>
                    {'Edit'}
                </StyledButton>
                <StyledButton onClick={deleteTransaction} type={'button'}>
                    {'Delete'}
                </StyledButton>
            </BorderlessTd>
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
