import React from 'react';

import {selectStyles, StyledSelect} from './styles';

const FromAccountSelector = (props) => {
    const {accounts, setEditedRow, editedRow} = props;

    const handleFromAccountEdit = (e) => {
        if (e.value === editedRow.to_account?.value) {
            // eslint-disable-next-line no-alert
            alert("The 'from' and 'to' accounts must be different.");
        } else {
            setEditedRow({
                ...editedRow,
                // eslint-disable-next-line camelcase
                from_account: e
            });
        }
    };

    return (
        <StyledSelect
            onChange={handleFromAccountEdit}
            options={accounts}
            styles={selectStyles}
            value={editedRow.from_account}
        />
    );
};

export default FromAccountSelector;
