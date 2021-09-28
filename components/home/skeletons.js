import React from 'react';
import styled from 'styled-components';

import {colors} from '../../styles';

import {StyledH2} from './headers';
import {StyledUnseenTransactionsContainer, StyledTableHeader, StyledTable} from './transactions-table';

const SkeletonTd = styled.td`
    height: 24px;
    border: 1px solid grey;
`;

const SkeletonTdContent = styled.div`
    height: 100%;

    background-color: ${colors.lightGrey};
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.6;
        }
        50% {
            opacity: 0.3;
        }
    }
`;

const StyledSkeletonTable = styled(StyledTable)`
    display: table;
    min-width: 100%;

    @media screen and (min-width: 768px) {
        min-width: 700px;
    }
`;

export const StyledTransactionsTableTBodySkeleton = styled.tbody`
    tr:nth-child(even) {
        background-color: ${colors.lightGrey};
    }
`;

export const StyledSummaryTableTBodySkeleton = styled.tbody`
    tr:nth-child(even) {
        background-color: ${colors.lightGrey};
    }
`;

export const RowSkeleton = ({numberOfColumns}) => (
    <tr>
        {Array.from({length: numberOfColumns}, () => (
            <SkeletonTd style={{padding: 0}}>
                <SkeletonTdContent />
            </SkeletonTd>
        ))}
    </tr>
);

export const TransactionsTableSkeleton = ({header}) => (
    <StyledUnseenTransactionsContainer>
        <StyledH2>{header}</StyledH2>
        <StyledSkeletonTable>
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
            <StyledTransactionsTableTBodySkeleton>
                {Array.from({length: 5}, () => (
                    <RowSkeleton numberOfColumns={6} />
                ))}
            </StyledTransactionsTableTBodySkeleton>
        </StyledSkeletonTable>
    </StyledUnseenTransactionsContainer>
);
