import {conn} from './transaction-wrapper-repository';

export const accountsListRepository = () =>
    conn().query(
        `
            SELECT
                accountId,
                accountName,
                category
            FROM
                accounts
		`
    );
