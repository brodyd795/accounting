import {withApiAuthRequired, getSession} from '@auth0/nextjs-auth0';
import * as Sentry from '@sentry/node';

import {ADMIN_EMAILS} from '../../../../enums/admin-emails';
import {markAsSeenService} from '../../services/mark-as-seen-service';
import {init} from '../../../../utils/sentry';

init();

export default withApiAuthRequired(async (req, res) => {
    try {
        const session = getSession(req, res);

        if (!ADMIN_EMAILS.includes(session.user.email)) {
            throw new Error('Unauthorized.');
        }

        const transactionId = req.body.transactionId;

        const data = await markAsSeenService({transactionId});

        res.json(data);
    } catch (error) {
        console.log(`error`, error);

        Sentry.captureException(error);
        res.status(error.status || 500).end(error.message);
    }
});
