import React from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

import {AccountsSummaryTable} from './accounts-summary-table';
import {UnseenTransactionsTable} from './unseen-transactions-table';
import {Search} from './search';

const StyledContainer = styled.div`
    flex: 1;
    margin: 0 auto;
    padding-bottom: 10px;
    max-width: 768px;
    width: 100%;
`;

export const Home = () => (
    <StyledContainer>
        <AccountsSummaryTable />
        <UnseenTransactionsTable />
        <Search />
    </StyledContainer>
);
