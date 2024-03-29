/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import TrashIcon from '../../public/icons/trash-alt-solid.svg';
import PencilIcon from '../../public/icons/pencil-alt-solid.svg';
import CheckmarkIcon from '../../public/icons/check-solid.svg';
import {useDemo} from '../../hooks/use-demo';
import {formatDateForDb, formatDateForUI} from '../../utils/date-helpers';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';
import {getRandomDollarAmount} from '../../utils/demo-helpers';

import {DemoableTd} from './demoable-td';
import {TransactionEditModal} from './modals/transaction-edit-modal';

const StyledButton = styled.button`
    margin: 0 4px;
    cursor: pointer;
    background-color: transparent;
    border: none;

    svg {
        display: inline-block;
        height: 20px;
        vertical-align: middle;
        width: 20px;

        path {
            fill: ${({hasBeenSeen}) => (hasBeenSeen ? 'grey' : 'black')};
        }
    }
`;

const StyledTd = styled.td`
    padding: 8px;
`;

const StyledDemoableTd = styled(DemoableTd)`
    padding: 8px;
`;

export const TransactionRow = ({transaction: transactionProp, hideSeenTransactions}) => {
    const [transaction, setTransaction] = useState(transactionProp);
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
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [wasDeleted, setWasDeleted] = useState(false);
    const date = new Date(dateString);

    if (wasDeleted || (isMarkedAsSeen && hideSeenTransactions)) {
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
            setTransaction({
                ...transaction,
                isMarkedAsSeen: true
            });
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
                setWasDeleted(true);
            } else {
                alert('Error while deleting...');
            }
        }
    };

    const editTransaction = () => {
        setShouldShowModal(true);
    };

    const amountInDollars = (isDemo ? getRandomDollarAmount() : amount) / 100;

    return (
        <tr>
            <StyledTd>{formatDateForUI(date)}</StyledTd>
            <StyledTd>{cleanAccountNameOrCategoryForUI(fromAccountName)}</StyledTd>
            <StyledTd>{cleanAccountNameOrCategoryForUI(toAccountName)}</StyledTd>
            <StyledDemoableTd>
                <NumberFormat
                    decimalScale={2}
                    decimalSeparator={'.'}
                    displayType={'text'}
                    fixedDecimalScale
                    isDemo={isDemo}
                    prefix={'$'}
                    renderText={(value, props) => <div {...props}>{value}</div>}
                    thousandSeparator={','}
                    value={amountInDollars}
                />
            </StyledDemoableTd>
            <StyledDemoableTd isDemo={isDemo}>{comment}</StyledDemoableTd>
            <StyledTd>
                <StyledButton
                    disabled={isDemo || isMarkedAsSeen}
                    hasBeenSeen={isMarkedAsSeen}
                    onClick={markTransactionAsSeen}
                    type={'button'}
                >
                    <CheckmarkIcon />
                </StyledButton>
                <StyledButton onClick={editTransaction} type={'button'}>
                    <PencilIcon />
                </StyledButton>
                <StyledButton disabled={isDemo} onClick={deleteTransaction} type={'button'}>
                    <TrashIcon />
                </StyledButton>
            </StyledTd>
            {shouldShowModal && (
                <TransactionEditModal
                    setShouldShowModal={setShouldShowModal}
                    setTransaction={setTransaction}
                    shouldShowModal={shouldShowModal}
                    transactionBeingEdited={transaction}
                />
            )}
        </tr>
    );
};
