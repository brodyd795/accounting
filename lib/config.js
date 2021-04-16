import {domains} from '../enums/domains';
import {environments} from '../enums/vercel-environments';

const getDomain = () => {
	const environment = process.env.VERCEL_ENV;

	if (environment === environments.PRODUCTION) {
		return `https://${domains.PRODUCTION}`;
	} else if (environment === environments.PREVIEW) {
		return process.env.VERCEL_GIT_COMMIT_REF === 'dev'
			? `https://${domains.DEV}`
			: `https://${process.env.VERCEL_URL}`;
	}

	return `http://${domains.LOCALHOST}`;
}

const getRedirectUrl = () => `${getDomain()}/api/auth/callback`;

if (typeof window === 'undefined') {
	module.exports = {
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
		AUTH0_SCOPE: process.env.AUTH0_SCOPE,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
		REDIRECT_URI: getRedirectUrl(),
		POST_LOGOUT_REDIRECT_URI: getDomain(),
		SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
		SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME
	};
} else {
	module.exports = {
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_SCOPE: process.env.AUTH0_SCOPE,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
		REDIRECT_URI: getRedirectUrl(),
		POST_LOGOUT_REDIRECT_URI: getDomain()
	};
}
