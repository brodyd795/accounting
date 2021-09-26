import styled, {css} from 'styled-components';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import {colors} from '../../../styles';

export const formFieldStyles = css`
    border: 1px solid ${colors.lightGrey};
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    color: ${colors.darkGrey};
`;

export const StyledNumberFormat = styled(NumberFormat)`
    width: 100px;
    border-radius: 10px;
    ${formFieldStyles};
`;

export const StyledDatePicker = styled(DatePicker)`
    width: 100px;
    ${formFieldStyles};
`;

export const selectStyles = {
    control: (base) => ({
        ...base,
        minHeight: 10
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: 1
    }),
    group: (base) => ({
        ...base,
        padding: 0
    }),
    groupHeading: (base) => ({
        ...base,
        padding: '3px 6px'
    }),
    input: (base) => ({
        ...base,
        margin: 0,
        padding: 0
    }),
    option: (base) => ({
        ...base,
        padding: '3px 6px'
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0px 6px'
    })
};

export const StyledSelect = styled(Select)`
    width: 150px;
    color: black;
    text-align: left;
`;

export const StyledRecentTableWrapper = styled.div`
    overflow-x: scroll;
`;

export const StyledRecentTable = styled.table`
    border: 1px solid black;

    th,
    td {
        padding: 5px;
        text-align: center;
    }
`;

export const StyledSummaryTable = styled.table`
    border: 1px solid #333;
    margin-bottom: 50px;
    margin-right: 10px;

    th,
    td {
        padding: 5px;
    }

    tr:nth-child(even) {
        background-color: white;
        color: #333;
    }

    .account-row {
        cursor: pointer;
    }

    .account {
        padding-left: 30px;
        padding-right: 10px;
    }

    .balance {
        padding-left: 20px;
        padding-right: 10px;
        text-align: right;
    }
`;
