import mysql from 'serverless-mysql';
import dotenv from 'dotenv';

dotenv.config();

let connection,
	isMidTransaction = false;

export const conn = () => {
	if (connection !== undefined) {
		return connection;
	}

	const database = process.env.VERCEL_GIT_COMMIT_REF === 'main' ? process.env.DB_NAME : process.env.DEV_DB_NAME;

	const config = {
		database: database,
		host: process.env.DB_HOST,
		password: process.env.DB_PASSWORD,
		user: process.env.DB_USER
	}

	connection = mysql({
		config
	});

	return connection;
};

export const withTransactionWrapper = async (queries, props) => {
	if (!isMidTransaction) {
		isMidTransaction = true;

		try {
			await conn().query('BEGIN');
            
			const results = await queries(props);

			await conn().query('COMMIT');

			return results;
		} catch (error) {
			await conn().query('ROLLBACK');
			console.log('Error in transaction', error)

			throw error;
		} finally {
			await conn().end();
			isMidTransaction = false;
		}
	}

	return queries(props);
};
