import {homeService} from '../services/home-service';

export default async (req, res) => {
	const database = process.env.VERCEL_GIT_COMMIT_REF === 'main' ? process.env.DB_NAME : process.env.DEV_DB_NAME;
	console.log(`database`, database)
	const data = await homeService();

	res.json(data);
};
