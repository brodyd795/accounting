import webPush from 'web-push';
import * as Sentry from '@sentry/node';

import {init} from '../../../../utils/sentry';
import {subscribeService} from '../../services/subscription-service';

init();

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
);

export default async (req, res) => {
    try {
        const {subscription} = req.body;
        console.log(`new subscription`, subscription);

        await subscribeService({subscription});

        res.status(200).json({created: true});
    } catch (error) {
        console.error(error);

        Sentry.captureException(error);
        res.status(error.status || 500).end(error.message);
    }
};
