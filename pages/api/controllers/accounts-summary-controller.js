import {accountsSummaryService} from '../services/accounts-summary-service';

export default async (req, res) => {
    try {
        const date = req.body.date;

        const data = await accountsSummaryService({date});

        res.json(data);
    } catch (error) {
        res.status(error.status || 500).end(error.message);
    }
};
