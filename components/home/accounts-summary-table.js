import React, {useState} from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import fetch from '../../lib/fetch';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';
import {useDemo} from '../../hooks/use-demo';
import {formatBalanceForUI} from '../../utils/balance-helpers';
import {getRandomAccountBalance} from '../../utils/demo-helpers';

import {DemoableTd} from './demoable-td';
import {NewTransactionModal} from './modals/new-transaction-modal';
import {StyledH2} from './headers';
import {RowSkeleton} from './skeletons';

const StyledTable = styled.table`
    table-layout: fixed;
    margin: 10px auto;

    border-collapse: collapse;
    overflow-x: scroll;
    display: block;
    max-width: fit-content;

    th,
    td {
        border: 1px solid black;
        padding: 8px;
    }

    thead > tr {
        background-color: #dedede;
    }

    tr:nth-child(even) {
        background-color: #dedede;
    }
`;

const StyledTablesContainer = styled.div`
    margin-top: 20px;

    display: block;

    @media (min-width: 768px) {
        display: flex;
    }
`;

const StyledSummaryTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledDatePicker = styled(DatePicker)`
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px;
    font-size: 16px;
`;

const StyledTopRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 8px;
`;

const StyledButton = styled.button`
    border-radius: 4px;
    padding: 4px;
    font-size: 16px;
`;

const Row = ({account}) => {
    const {isDemo} = useDemo();
    const category = cleanAccountNameOrCategoryForUI(account.category);
    const name = cleanAccountNameOrCategoryForUI(account.accountName);
    const {balance, isNegative} = formatBalanceForUI(account);
    const balanceToDisplay = isDemo ? getRandomAccountBalance(account) : balance;

    return (
        <tr>
            <td>{category}</td>
            <td>{name}</td>
            <DemoableTd isDemo={isDemo} isNegative={isNegative}>
                {balanceToDisplay}
            </DemoableTd>
        </tr>
    );
};

export const AccountsSummaryTable = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const {data, error} = useSWR(`/api/controllers/accounts-summary-controller?date=${selectedMonth}`, fetch);

    if (error) {
        return <div>{'Error!'}</div>;
    }

    if (!data) {
        return (
            <StyledSummaryTableContainer>
                <StyledH2>{'Accounts Summary'}</StyledH2>
                <StyledTopRow>
                    <StyledDatePicker
                        dateFormat={'MMMM yyyy'}
                        maxDate={new Date()}
                        minDate={new Date(2021, 3, 1)}
                        selected={new Date()}
                    />
                    <StyledButton type={'button'}>{'New transaction'}</StyledButton>
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
                        {Array.from({length: 6}, () => (
                            <RowSkeleton numberOfColumns={3} />
                        ))}
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
                            {Array.from({length: 7}, () => (
                                <RowSkeleton numberOfColumns={3} />
                            ))}
                        </tbody>
                    </StyledTable>
                </StyledTablesContainer>
            </StyledSummaryTableContainer>
        );
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
                            <Row account={account} key={account.accountId} />
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
                            <Row account={account} key={account.accountId} />
                        ))}
                    </tbody>
                </StyledTable>
            </StyledTablesContainer>
        </StyledSummaryTableContainer>
    );
};
