import {homeService} from '../services/home-service';

export default async (req, res) => {
	const data = await homeService();

	res.json(data);
};
