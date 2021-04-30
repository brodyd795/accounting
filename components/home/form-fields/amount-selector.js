import React from 'react';

import {StyledNumberFormat} from './styles';

const AmountSelector = (props) => {
    const {field, form} = props;
    const {value, name} = field;
    const {setFieldValue} = form;

    return (
        <StyledNumberFormat
            allowNegative={false}
            decimalScale={2}
            decimalSeparator={'.'}
            name={name}
            onValueChange={(val) => setFieldValue(name, val.floatValue)}
            prefix={'$'}
            thousandSeparator={','}
            value={value}
        />
    );
};

export default AmountSelector;
