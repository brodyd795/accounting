// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-undef */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-restricted-globals */

self.__WB_DISABLE_DEV_LOGS = true;

// credit: based on https://github.com/shadowwalker/next-pwa/blob/master/examples/web-push/worker/index.js
self.addEventListener('push', (event) => {
    const data = JSON.parse(event.data.text());

    event.waitUntil(
        registration.showNotification(data.title, {
            body: data.message,
            icon: '/icons/android-chrome-192x192.png'
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients
            .matchAll({
                includeUncontrolled: true,
                type: 'window'
            })
            .then((clientList) => {
                if (clientList.length) {
                    let client = clientList[0];

                    for (const element of clientList) {
                        if (element.focused) {
                            client = element;
                        }
                    }

                    return client.focus();
                }

                return clients.openWindow('/');
            })
    );
});

self.addEventListener('pushsubscriptionchange', (event) => {
    event.waitUntil(
        Promise.all([
            Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
            Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration)).then((sub) =>
                saveSubscription(sub)
            )
        ])
    );
});
