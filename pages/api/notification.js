import webPush from 'web-push';
import * as Sentry from '@sentry/node';

import {init} from '../../utils/sentry';

init();

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
);

export default async (req, res) => {
    try {
        const {subscription} = req.body;
        console.log(`subscription`, subscription);

        const notificationBody = JSON.stringify({
            message: 'Your web push notification is here!',
            title: 'Hello Web Push'
        });

        const response = await webPush.sendNotification(subscription, notificationBody);

        res.writeHead(response.statusCode, response.headers).end(response.body);
    } catch (error) {
        if ('statusCode' in error) {
            res.writeHead(error.statusCode, error.headers).end(error.body);
        } else {
            console.error(error);

            Sentry.captureException(error);
            res.status(error.status || 500).end(error.message);
        }
    }
};
