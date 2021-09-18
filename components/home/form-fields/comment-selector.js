import React from 'react';

const CommentSelector = (props) => {
    const {field, form} = props;
    const {name} = field;
    const {setFieldValue} = form;

    return (
        <input
            {...field}
            {...props}
            onValueChange={(val) => setFieldValue(name, val)}
            placeholder={'Enter description...'}
            required
        />
    );
};

export default CommentSelector;
