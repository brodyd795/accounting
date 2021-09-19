import React from 'react';
import styled from 'styled-components';

import {StyledH2} from './headers';
import {StyledUnseenTransactionsContainer, StyledTableHeader, StyledTable} from './transactions-table';

const SkeletonTd = styled.td`
    height: 24px;
`;

const SkeletonTdContent = styled.div`
    height: 100%;

    box-shadow: 0 4px 10px 0 rgba(33, 33, 33, 0.15);
    border-radius: 4px;
    position: relative;
    overflow: hidden;

    ::before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(to right, transparent 0%, #d8d8d8 50%, transparent 100%);
        animation: load 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes load {
        from {
            left: -150px;
        }
        to {
            left: 100%;
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
            <tbody>
                {Array.from({length: 5}, () => (
                    <RowSkeleton numberOfColumns={6} />
                ))}
            </tbody>
        </StyledSkeletonTable>
        )
    </StyledUnseenTransactionsContainer>
);
