import React from 'react';

import {useDemo} from '../../../hooks/use-demo';

import {BlurrableInput} from './styles';

const CommentSelector = (props) => {
    const {field, form} = props;
    const {value, name} = field;
    const {setFieldValue} = form;
    const {isDemo} = useDemo();

    return (
        <BlurrableInput
            isDemo={isDemo}
            onValueChange={(val) => setFieldValue(name, val)}
            placeholder={'Enter description...'}
            required
            value={value}
        />
    );
};

export default CommentSelector;
