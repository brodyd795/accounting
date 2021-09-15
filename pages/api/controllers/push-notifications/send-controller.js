import webPush from 'web-push';
import * as Sentry from '@sentry/node';

import {init} from '../../../../utils/sentry';
import {getSubscriptionsService} from '../../services/subscription-service';

init();

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
);

export default async (req, res) => {
    try {
        const subscriptions = await getSubscriptionsService();

        const notificationBody = JSON.stringify({
            message: 'Your web push notification is here!',
            title: 'Hello Web Push'
        });

        const promises = subscriptions.map(({endpoint, private_key, auth}) => {
            const formattedSub = {
                endpoint,
                keys: {
                    auth,
                    // eslint-disable-next-line camelcase
                    p256dh: private_key
                }
            };

            return webPush.sendNotification(formattedSub, notificationBody);
        });

        await Promise.all(promises);

        res.status(200).json({sent: true});
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        Sentry.captureException(error);
        res.status(error.status || 500).end(error.message);
    }
};
