import React from 'react';
import styled from 'styled-components';

import {formFieldStyles} from './styles';

const StyledInput = styled.input`
    border-radius: 10px;
    ${formFieldStyles};
`;

const CommentSelector = (props) => {
    const {field, form} = props;
    const {name} = field;
    const {setFieldValue} = form;

    return (
        <StyledInput
            {...field}
            {...props}
            onValueChange={(val) => setFieldValue(name, val)}
            placeholder={'Enter description...'}
            required
        />
    );
};

export default CommentSelector;
