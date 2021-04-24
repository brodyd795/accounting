import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

import fetch from '../../lib/fetch';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';

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

const StyledTablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Home = () => {
    const {data, error} = useSWR('/api/controllers/accounts-summary-controller', fetch);
    
    if (error) {
        return <div>{'Error!'}</div>
    }

    if (!data) {
        return <div>{'Loading accounts summary...'}</div>
    }

    const monthlyAccounts = data.filter((account) => account.category === 'Income' || account.category === 'Expenses');
    const persistentAccounts = data.filter((account) => account.category === 'Assets' || account.category === 'Debts');

    return (
        <StyledContainer>
            <StyledHeader>
                <h1>{'Accounting'}</h1>
            </StyledHeader>
            <StyledTablesContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>{'Category'}</th>
                            <th>{'Account Name'}</th>
                            <th>{'Balance'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persistentAccounts.map((account) => 
                            <tr key={account.accountId}>
                                <td>{cleanAccountNameOrCategoryForUI(account.category)}</td>
                                <td>{cleanAccountNameOrCategoryForUI(account.accountName)}</td>
                                <td>{account.balance}</td>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>{'Category'}</th>
                            <th>{'Account Name'}</th>
                            <th>{'Balance'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyAccounts.map((account) => 
                            <tr key={account.accountId}>
                                <td>{cleanAccountNameOrCategoryForUI(account.category)}</td>
                                <td>{cleanAccountNameOrCategoryForUI(account.accountName)}</td>
                                <td>{account.balance}</td>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </StyledTablesContainer>
        </StyledContainer>
    )
};