import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

import fetcher from '../../lib/fetch';

import {RowSkeleton} from './skeletons';
import {
    TransactionsTable,
    StyledUnseenTransactionsContainer,
    StyledTableHeader,
    StyledTable
} from './transactions-table';
import {StyledH2} from './headers';

const header = 'Unseen Transactions';

const StyledSkeletonTable = styled(StyledTable)`
    display: table;
    min-width: 100%;

    @media screen and (min-width: 768px) {
        min-width: 700px;
    }
`;

export const UnseenTransactionsTable = () => {
    const {data, error} = useSWR('/api/controllers/unseen-transactions-controller', fetcher);

    if (error) {
        return <div>{'Error!'}</div>;
    }

    if (!data) {
        return (
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
    }

    return (
        <TransactionsTable data={data} header={header} hideSeenTransactions noResultsText={"You're all caught up!"} />
    );
};
