import auth0 from '../../../lib/auth0';

import config from '../../../lib/config';

export default async (req, res) => {
	try {
		console.log(`config`, config)
		console.log('in login');
		await auth0.handleLogin(req, res);
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};
