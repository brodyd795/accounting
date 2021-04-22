import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

import fetch from '../../lib/fetch';

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
            <table>
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
                            <td>{account.accountName}</td>
                            <td>{account.balance}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </StyledContainer>
    )
};
