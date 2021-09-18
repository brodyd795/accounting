import {withApiAuthRequired, getSession} from '@auth0/nextjs-auth0';
import {withSentry, captureException, flush} from '@sentry/nextjs';

import {ADMIN_EMAILS} from '../../../../enums/admin-emails';
import {searchService} from '../../services/search-service';

const handler = async (req, res) => {
    try {
        const session = getSession(req, res);

        if (!ADMIN_EMAILS.includes(session.user.email)) {
            throw new Error('Unauthorized.');
        }

        const input = req.body.input;

        const data = await searchService({input});

        res.json(data);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        captureException(error);
        await flush(2000);

        res.status(error.status || 500).end(error.message);
    }
};

export default withSentry(withApiAuthRequired(handler));
