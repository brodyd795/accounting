import React from 'react';
import {useField, useFormikContext} from 'formik';

import {StyledDatePicker} from './styles';

const DatePickerField = ({...props}) => {
    const {setFieldValue} = useFormikContext();
    const [field] = useField(props);

    return (
        <StyledDatePicker
            {...field}
            {...props}
            onChange={(val) => {
                setFieldValue(field.name, val);
            }}
            selected={(field.value && new Date(field.value)) || null}
        />
    );
};

export default DatePickerField;
