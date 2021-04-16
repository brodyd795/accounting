import {accountsSummaryService} from '../services/accounts-summary-service';

export default async (req, res) => {
	try {
		const data = await accountsSummaryService();
	
		res.json(data);
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};
