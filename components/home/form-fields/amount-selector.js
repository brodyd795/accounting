import React from 'react';

import {useDemo} from '../../../hooks/use-demo';

import {StyledNumberFormat} from './styles';

const AmountSelector = (props) => {
    const {field, form} = props;
    const {value, name} = field;
    const {setFieldValue} = form;
    const {isDemo} = useDemo();

    return (
        <StyledNumberFormat
            allowNegative={false}
            decimalScale={2}
            decimalSeparator={'.'}
            isDemo={isDemo}
            name={name}
            onValueChange={(val) => setFieldValue(name, val.floatValue)}
            prefix={'$'}
            thousandSeparator={','}
            value={value}
        />
    );
};

export default AmountSelector;
