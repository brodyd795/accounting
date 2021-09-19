import React from 'react';
import styled from 'styled-components';

import {StyledH2} from './headers';
import {TransactionRow} from './transaction-row';

const StyledUnseenTransactionsContainer = styled.div`
    margin: 40px 8px 0;
`;

const StyledTableHeader = styled.td`
    border: 1px solid black;
    padding: 8px;
    font-weight: bold;
`;

const StyledTableHeaderWithBorderlessBottom = styled(StyledTableHeader)`
    border-bottom: none;
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

    th {
        border: 1px solid black;
        padding: 8px;
    }
`;

const TransactionsTable = ({data, noResultsText, header, hideSeenTransactions = false}) => (
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
                        <StyledTableHeaderWithBorderlessBottom>{''}</StyledTableHeaderWithBorderlessBottom>
                    </tr>
                </thead>
                <tbody>
                    {data.map((transaction) => (
                        <TransactionRow
                            hideSeenTransactions={hideSeenTransactions}
                            key={transaction.transactionId}
                            transaction={transaction}
                        />
                    ))}
                </tbody>
            </StyledTable>
        ) : (
            noResultsText
        )}
    </StyledUnseenTransactionsContainer>
);

export {TransactionsTable, StyledUnseenTransactionsContainer, StyledTableHeader, StyledTable};
