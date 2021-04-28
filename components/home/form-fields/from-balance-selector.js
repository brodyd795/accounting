import React from 'react';

import {StyledNumberFormat} from '../styles';

const FromBalanceSelector = props => {
	const {setEditedRow, value} = props;

	const handleFromBalanceEdit = e => {
		const from_balance = e.target.value;

		setEditedRow(editedRow => ({
			...editedRow,
			from_balance
		}));
	};

	return (
		<StyledNumberFormat
			allowNegative={false}
			decimalScale={2}
			decimalSeparator={'.'}
			onBlur={handleFromBalanceEdit}
			prefix={'$'}
			thousandSeparator={','}
			value={value}
		/>
	);
};

export default FromBalanceSelector;
