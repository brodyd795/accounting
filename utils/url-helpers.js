import {domains} from '../enums/domains';
import {environments} from '../enums/vercel-environments';

export const redirectTo = (redirectToUrl) => {
    if (redirectToUrl) {
        return `/api/auth/login?redirectTo=${encodeURIComponent(redirectToUrl)}`;
    }

    return `/api/auth/login`;
};

export const getBaseUrl = () => {
    const environment = process.env.VERCEL_ENV;

    if (environment === environments.PRODUCTION) {
        return `https://${domains.PRODUCTION}`;
    } else if (environment === environments.PREVIEW) {
        return process.env.VERCEL_GIT_COMMIT_REF === 'dev'
            ? `https://${domains.DEV}`
            : `https://${process.env.VERCEL_URL}`;
    }

    // eslint-disable-next-line unicorn/string-content
    return `http://${domains.LOCALHOST}`;
};

export const getRedirectUrl = () => `${getBaseUrl()}/api/auth/callback`;
