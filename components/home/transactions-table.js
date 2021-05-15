import React from 'react';
import styled from 'styled-components';

import {StyledH2} from './headers';
import {TransactionRow} from './transaction-row';

const StyledUnseenTransactionsContainer = styled.div`
    margin-top: 40px;
`;

const StyledTableHeader = styled.td`
    font-weight: bold;
`;

const StyledTable = styled.table`
    border: 2px solid black;
    border-radius: 10px;
    margin: auto;
    border-collapse: collapse;
    overflow-x: scroll;
    display: block;
    max-width: fit-content;
    white-space: nowrap;

    th, td {
        border: 1px solid black;
        padding: 8px;
    }
`;

export const TransactionsTable = ({data, noResultsText, header}) => (
    <StyledUnseenTransactionsContainer>
        <StyledH2>{header}</StyledH2>
        {data.length ? (
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTableHeader>{'Date'}</StyledTableHeader>
                        <StyledTableHeader>{'From'}</StyledTableHeader>
                        <StyledTableHeader>{'To'}</StyledTableHeader>
                        <StyledTableHeader>{'Amount'}</StyledTableHeader>
                        <StyledTableHeader>{'Comment'}</StyledTableHeader>
                        <StyledTableHeader>{'Buttons'}</StyledTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {data.map((transaction) => (
                        <TransactionRow key={transaction.transactionId} transaction={transaction} />
                    ))}
                </tbody>
            </StyledTable>
        ) : (
            noResultsText
        )}
    </StyledUnseenTransactionsContainer>
);
