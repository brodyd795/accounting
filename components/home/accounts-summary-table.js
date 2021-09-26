import React, {useState} from 'react';
import useSWR from 'swr';
import styled, {css} from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NumberFormat from 'react-number-format';

import DownIcon from '../../public/icons/angle-down-solid.svg';
import PlusIcon from '../../public/icons/plus-solid.svg';
import fetch from '../../lib/fetch';
import {cleanAccountNameOrCategoryForUI} from '../../utils/string-helpers';
import {useDemo} from '../../hooks/use-demo';
import {formatBalanceForUI} from '../../utils/balance-helpers';
import {getRandomAccountBalance} from '../../utils/demo-helpers';
import {colors} from '../../styles';

import {DemoableTd} from './demoable-td';
import {NewTransactionModal} from './modals/new-transaction-modal';
import {StyledH2} from './headers';
import {RowSkeleton, StyledSummaryTableTBodySkeleton} from './skeletons';

const StyledTable = styled.table`
    width: 100%;
    margin: 30px auto;

    border-collapse: collapse;
    overflow-x: scroll;

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

    @media (min-width: 768px) {
        margin: 10px;
    }
`;

const StyledTablesContainer = styled.div`
    margin: 0 10px;

    @media (min-width: 768px) {
        display: flex;
    }
`;

const StyledSummaryTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

// extract button styles
// extract duplicate skeleton content

const buttonStyles = css`
    text-align: center;
    border-radius: 16px;
    border: transparent;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    background-color: ${colors.green};
    color: ${colors.lightGreen};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledDownIcon = styled(DownIcon)`
    display: inline-block;
    height: 16px;
    vertical-align: middle;
    width: 16px;
    margin-left: -10px;
    z-index: 100;

    path {
        fill: ${colors.lightGreen};
    }
`;

const StyledPlusIcon = styled(PlusIcon)`
    display: inline-block;
    height: 16px;
    vertical-align: middle;
    width: 16px;
    margin-left: 26px;

    path {
        fill: ${colors.lightGreen};
    }
`;

const StyledButton = styled.button`
    ${buttonStyles};
`;

const StyledDatePicker = styled(DatePicker)`
    background-color: ${colors.green};
    color: ${colors.lightGreen};
    border: transparent;
    font-size: 16px;
    text-align: center;
    margin-left: -10px;
`;

const StyledTopRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 8px;
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
                <NumberFormat
                    decimalScale={2}
                    decimalSeparator={'.'}
                    displayType={'text'}
                    fixedDecimalScale
                    isDemo={isDemo}
                    name={name}
                    prefix={'$'}
                    renderText={(value, props) => <div {...props}>{value}</div>}
                    thousandSeparator={','}
                    value={balanceToDisplay}
                />
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
                    <StyledButton>
                        <StyledDatePicker
                            dateFormat={'MMMM yyyy'}
                            maxDate={new Date()}
                            minDate={new Date(2021, 3, 1)}
                            selected={new Date()}
                        />
                        <StyledDownIcon />
                    </StyledButton>
                    <StyledButton type={'button'}>
                        <div>{'foo'}</div>
                        <div>{'bar'}</div>
                    </StyledButton>
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
                        <StyledSummaryTableTBodySkeleton>
                            {Array.from({length: 6}, () => (
                                <RowSkeleton numberOfColumns={3} />
                            ))}
                        </StyledSummaryTableTBodySkeleton>
                    </StyledTable>
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>{'Category'}</th>
                                <th>{'Account Name'}</th>
                                <th>{'Balance'}</th>
                            </tr>
                        </thead>
                        <StyledSummaryTableTBodySkeleton>
                            {Array.from({length: 7}, () => (
                                <RowSkeleton numberOfColumns={3} />
                            ))}
                        </StyledSummaryTableTBodySkeleton>
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
                <StyledButton>
                    <StyledDatePicker
                        dateFormat={'MMMM yyyy'}
                        maxDate={new Date()}
                        minDate={new Date(2021, 3, 1)}
                        onChange={(newDate) => setSelectedMonth(newDate)}
                        selected={selectedMonth}
                        showMonthYearPicker
                    />
                    <StyledDownIcon />
                </StyledButton>
                <StyledButton onClick={() => setShouldShowModal(true)} type={'button'}>
                    {'New transaction'}
                    <StyledPlusIcon />
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
