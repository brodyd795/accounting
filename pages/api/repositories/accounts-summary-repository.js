import escape from 'sql-template-strings';

import {conn} from './transaction-wrapper-repository';

export const accountsSummaryRepository = async () => {
	return conn().query(
		escape`
			SELECT
                *
            FROM
                transactions
            LIMIT
                1
		`
	);
};
