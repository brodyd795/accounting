import React from 'react';
import styled from 'styled-components';

import {AccountsSummaryTable} from './accounts-summary-table';
import {UnseenTransactionsTable} from './unseen-transactions-table';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
`;

const StyledHeader = styled.div`
    text-align: center;
`;

export const Home = () => {
    return (
        <StyledContainer>
            <StyledHeader>
                <h1>{'Accounting'}</h1>
            </StyledHeader>
            <AccountsSummaryTable />
            <UnseenTransactionsTable />
        </StyledContainer>
    )
};
