import React, {useState} from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import fetch from '../../lib/fetch';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';
import {useDemo} from '../../hooks/use-demo';

import {BlurrableTd} from './blurrable-td';
import {NewTransactionModal} from './modals/new-transaction-modal';

const StyledTable = styled.table`
    table-layout: fixed;
    margin: 0 auto;
    width: 500px;
`;

const StyledTablesContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const StyledSummaryTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledDatePicker = styled(DatePicker)`
    text-align: center;
    background-color: green;
    border-radius: 4px;
    border: 1px solid green;
    cursor: pointer;
    padding: 4px;
    font-size: 16px;
`;

const StyledH2 = styled.h2`
    text-align: center;
`;

const StyledTopRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 8px;
`;

const StyledButton = styled.button`
    border-radius: 4px;
    background-color: green;
    border: 1px solid green;
    padding: 4px;
    font-size: 16px;
    color: white;
`;

export const AccountsSummaryTable = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const {data, error} = useSWR(`/api/controllers/accounts-summary-controller?date=${selectedMonth}`, fetch);
    const {isDemo} = useDemo();

    if (error) {
        return <div>{'Error!'}</div>;
    }

    if (!data) {
        return <div>{'Loading accounts summary...'}</div>;
    }

    const monthlyAccounts = data.filter((account) => account.category === 'Income' || account.category === 'Expenses');
    const persistentAccounts = data.filter((account) => account.category === 'Assets' || account.category === 'Debts');

    return (
        <StyledSummaryTableContainer>
            <StyledH2>{'Accounts Summary'}</StyledH2>
            <StyledTopRow>
                <StyledDatePicker
                    dateFormat={'MMMM yyyy'}
                    maxDate={new Date()}
                    minDate={new Date(2021, 3, 1)}
                    onChange={(newDate) => setSelectedMonth(newDate)}
                    selected={selectedMonth}
                    showMonthYearPicker
                />
                <StyledButton onClick={() => setShouldShowModal(true)} type={'button'}>
                    {'New transaction'}
                </StyledButton>
                {shouldShowModal && (
                    <NewTransactionModal setShouldShowModal={setShouldShowModal} shouldShowModal={shouldShowModal} />
                )}
            </StyledTopRow>
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
                        {persistentAccounts.map((account) => (
                            <tr key={account.accountId}>
                                <td>{cleanAccountNameOrCategoryForUI(account.category)}</td>
                                <td>{cleanAccountNameOrCategoryForUI(account.accountName)}</td>
                                <BlurrableTd isDemo={isDemo}>{account.balance}</BlurrableTd>
                            </tr>
                        ))}
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
                        {monthlyAccounts.map((account) => (
                            <tr key={account.accountId}>
                                <td>{cleanAccountNameOrCategoryForUI(account.category)}</td>
                                <td>{cleanAccountNameOrCategoryForUI(account.accountName)}</td>
                                <BlurrableTd isDemo={isDemo}>{account.balance}</BlurrableTd>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </StyledTablesContainer>
        </StyledSummaryTableContainer>
    );
};
