import auth0 from '../../../lib/auth0';

export default async (req, res) => {
	try {
		console.log('in login', req);
		await auth0.handleLogin(req, res);
	} catch (error) {
		res.status(error.status || 500).end(error.message);
	}
};
