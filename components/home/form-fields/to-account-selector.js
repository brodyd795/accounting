import React from 'react';

import {selectStyles, StyledSelect} from './styles';

const ToAccountSelector = (props) => {
    const {accounts, setEditedRow, editedRow} = props;

    const handleToAccountEdit = (e) => {
        if (e.value === editedRow.from_account?.value) {
            // eslint-disable-next-line no-alert
            alert("The 'from' and 'to' accounts must be different.");
        } else {
            setEditedRow({
                ...editedRow,
                // eslint-disable-next-line camelcase
                to_account: e
            });
        }
    };

    return (
        <StyledSelect
            onChange={handleToAccountEdit}
            options={accounts}
            styles={selectStyles}
            value={editedRow.to_account}
        />
    );
};

export default ToAccountSelector;
