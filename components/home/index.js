import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

import fetch from '../../lib/fetch';
import { cleanAccountNameForUI } from '../../utils/string-helpers';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
`;

const StyledHeader = styled.div`
    text-align: center;
`;

const StyledTable = styled.table`
    width: 50%;
`;

export const Home = () => {
    const {data, error} = useSWR('/api/controllers/accounts-summary-controller', fetch);
    
    if (error) {
        return <div>{'Error!'}</div>
    }

    if (!data) {
        return <div>{'Loading...'}</div>
    }

    return (
        <StyledContainer>
            <StyledHeader>
                <h1>{'Accounting'}</h1>
            </StyledHeader>
            <StyledTable>
                <thead>
                    <tr>
                        <th>{'Category'}</th>
                        <th>{'Account Name'}</th>
                        <th>{'Balance'}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((account) => 
                        <tr key={account.accountId}>
                            <td>{account.category}</td>
                            <td>{cleanAccountNameForUI(account.accountName)}</td>
                            <td>{account.balance}</td>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </StyledContainer>
    )
};
