import React from 'react';
import styled from 'styled-components';

import {TransactionRow} from './transaction-row';

const StyledUnseenTransactionsContainer = styled.div`
    margin-top: 40px;
`;

const StyledTableHeader = styled.td`
    font-weight: bold;
`;

const StyledH2 = styled.h2`
    text-align: center;
`;

const StyledTable = styled.table`
    border: 2px solid black;
    padding: 8px;
    border-collapse: collapse;

    th, td {
        border: 1px solid black;
        padding: 8px;
        white-space: nowrap;
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
                        <StyledTableHeader />
                    </tr>
                </thead>
                {data.map((transaction) => (
                    <TransactionRow key={transaction.transactionId} transaction={transaction} />
                ))}
            </StyledTable>
        ) : (
            noResultsText
        )}
    </StyledUnseenTransactionsContainer>
);
