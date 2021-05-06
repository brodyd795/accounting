import React from 'react';
import styled from 'styled-components';

import {TransactionRow} from './transaction-row';

const StyledUnseenTransactionsContainer = styled.div`
    margin-top: 40px;
`;

const StyledTableHeader = styled.td`
    font-weight: bold;
`;

export const TransactionsTable = ({data, noResultsText, header}) => (
    <StyledUnseenTransactionsContainer>
        <h2>{header}</h2>
        {data.length ? (
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
        ) : (
            noResultsText
        )}
    </StyledUnseenTransactionsContainer>
);
