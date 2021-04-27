import React, {useState} from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import fetch from '../../lib/fetch';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';

const StyledTable = styled.table`
    width: 50%;
`;

const StyledTablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AccountsSummaryTable = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const {data, error} = useSWR(`/api/controllers/accounts-summary-controller?date=${selectedMonth}`, fetch);
    
    if (error) {
        return <div>{'Error!'}</div>
    }

    if (!data) {
        return <div>{'Loading accounts summary...'}</div>
    }

    const monthlyAccounts = data.filter((account) => account.category === 'Income' || account.category === 'Expenses');
    const persistentAccounts = data.filter((account) => account.category === 'Assets' || account.category === 'Debts');

    return (
        <>
            <DatePicker
                dateFormat={'MMMM yyyy'}
                maxDate={new Date()}
                minDate={new Date(2021, 3, 1)}
                onChange={newDate => setSelectedMonth(newDate)}
                selected={selectedMonth}
                showMonthYearPicker
            />
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
        </>
    )
};
