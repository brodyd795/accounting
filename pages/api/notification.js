const webPush = require('web-push');

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
);

export default (req, res) => {
    if (req.method === 'POST') {
        const {subscription} = req.body;
        console.log(`subscription`, subscription);

        webPush
            .sendNotification(
                subscription,
                JSON.stringify({
                    message: 'Your web push notification is here!',
                    title: 'Hello Web Push'
                })
            )
            .then((response) => {
                res.writeHead(response.statusCode, response.headers).end(response.body);
            })
            .catch((error) => {
                if ('statusCode' in error) {
                    res.writeHead(error.statusCode, error.headers).end(error.body);
                } else {
                    console.error(error);

                    // eslint-disable-next-line no-param-reassign
                    res.statusCode = 500;
                    res.end();
                }
            });
    } else {
        // eslint-disable-next-line no-param-reassign
        res.statusCode = 405;
        res.end();
    }
};
