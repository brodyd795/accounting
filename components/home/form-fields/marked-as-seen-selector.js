import React from 'react';

const MarkedAsSeenSelector = (props) => {
    const {field, form} = props;
    const {name, value} = field;
    const {setFieldValue} = form;

    return (
        <input
            {...field}
            {...props}
            checked={value}
            onValueChange={(val) => setFieldValue(name, val)}
            type="checkbox"
        />
    );
};

export default MarkedAsSeenSelector;
