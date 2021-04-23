import {initAuth0} from '@auth0/nextjs-auth0';

import config from './config';

export default initAuth0({
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    domain: config.AUTH0_DOMAIN,
    postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI,
    redirectUri: config.REDIRECT_URI,
    scope: config.AUTH0_SCOPE,
    session: {
        cookieLifetime: config.SESSION_COOKIE_LIFETIME,
        cookieSecret: config.SESSION_COOKIE_SECRET,
        storeAccessToken: false,
        storeIdToken: false,
        storeRefreshToken: false
    }
});
