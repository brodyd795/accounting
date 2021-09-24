import webPush from 'web-push';
import {withSentry, captureException, flush} from '@sentry/nextjs';

import {getSubscriptionsService} from '../../services/subscription-service';
import {unseenTransactionsService} from '../../services/unseen-transactions-service';

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
);

const handler = async (req, res) => {
    try {
        const [subscriptions, newTransactions] = await Promise.all([
            getSubscriptionsService(),
            unseenTransactionsService()
        ]);

        if (!newTransactions.length || !subscriptions.length) {
            res.status(200).json({
                reason: 'No new transactions',
                sent: false
            });
        } else {
            const notificationBody = JSON.stringify({
                message: `You have ${newTransactions.length} new transactions to review`,
                title: 'New Transactions'
            });

            const promises = subscriptions.map(({endpoint, private_key, auth}) => {
                const formattedSubscription = {
                    endpoint,
                    keys: {
                        auth,
                        // eslint-disable-next-line camelcase
                        p256dh: private_key
                    }
                };

                return webPush.sendNotification(formattedSubscription, notificationBody);
            });

            await Promise.all(promises);

            res.status(200).json({sent: true});
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        captureException(error);
        await flush(2000);

        res.status(error.status || 500).end(error.message);
    }
};

export default withSentry(handler);
