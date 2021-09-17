import {withApiAuthRequired, getSession} from '@auth0/nextjs-auth0';
import * as Sentry from '@sentry/node';

import {ADMIN_EMAILS} from '../../../enums/admin-emails';
import {accountsListService} from '../services/accounts-list-service';
import {init} from '../../../utils/sentry';

init();

export default withApiAuthRequired(async (req, res) => {
    try {
        const session = getSession(req, res);

        if (!ADMIN_EMAILS.includes(session.user.email)) {
            throw new Error('Unauthorized.');
        }

        const data = await accountsListService();

        res.json(data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        Sentry.captureException(error);
        res.status(error.status || 500).end(error.message);
    }
});
