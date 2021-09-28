import React from 'react';
import styled from 'styled-components';

import {colors, StyledSection as Section} from '../../styles';

import {StyledH2} from './headers';
import {TransactionRow} from './transaction-row';

const StyledSection = styled(Section)`
    display: block;
`;

const StyledUnseenTransactionsContainer = styled.div`
    margin: 16px 8px 0;
`;

const StyledTableHeader = styled.td`
    padding: 8px;
    font-weight: bold;
`;

const StyledTableHeaderWithBorderlessBottom = styled(StyledTableHeader)`
    border-bottom: none;
`;

const StyledTable = styled.table`
    border: 1px solid ${colors.darkGrey};
    border-collapse: collapse;
    margin: auto;
    overflow-x: scroll;
    display: block;
    max-width: fit-content;
    white-space: nowrap;

    th,
    td {
        padding: 8px;
    }

    thead > tr {
        background-color: ${colors.lightGrey};
    }

    tr:nth-child(even) {
        background-color: ${colors.lightGrey};
    }
`;

const TransactionsTable = ({data, noResultsText, header, hideSeenTransactions = false}) => (
    <StyledSection>
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
    </StyledSection>
);

export {TransactionsTable, StyledUnseenTransactionsContainer, StyledTableHeader, StyledTable};
