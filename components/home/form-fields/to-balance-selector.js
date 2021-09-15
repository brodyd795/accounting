// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React from 'react';

import {StyledNumberFormat} from './styles';

const ToBalanceSelector = (props) => {
    const {setEditedRow, value} = props;

    const handleToBalanceEdit = (e) => {
        const to_balance = e.target.value;

        setEditedRow((editedRow) => ({
            ...editedRow,
            to_balance
        }));
    };

    return (
        <StyledNumberFormat
            allowNegative={false}
            decimalScale={2}
            decimalSeparator={'.'}
            onBlur={handleToBalanceEdit}
            prefix={'$'}
            thousandSeparator={','}
            value={value}
        />
    );
};

export default ToBalanceSelector;
