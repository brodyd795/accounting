import React from 'react';

import {useDemo} from '../../../hooks/use-demo';

import {BlurrableInput} from './styles';

const CommentSelector = (props) => {
    const {field, form} = props;
    const {name} = field;
    const {setFieldValue} = form;
    const {isDemo} = useDemo();

    return (
        <BlurrableInput
            isDemo={isDemo}
            {...field}
            {...props}
            onValueChange={(val) => setFieldValue(name, val)}
            placeholder={'Enter description...'}
            required
        />
    );
};

export default CommentSelector;
