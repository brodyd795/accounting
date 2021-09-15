import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const base64ToUint8Array = (base64) => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replaceAll('-', '+').replaceAll('_', '/');

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
};

const StyledSubscribeButton = styled.div`
    display: flex;
    align-items: center;
`;

const StyledInput = styled.input`
    margin-right: 8px;
`;

export const WebPushSubscription = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then(async (sub) => {
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        console.log(`sub`, sub);
                        setSubscription(sub);
                        setIsSubscribed(true);

                        // await fetch('/api/controllers/push-notifications/subscribe-controller', {
                        //     body: JSON.stringify({
                        //         subscription: sub
                        //     }),
                        //     headers: {
                        //         'Content-type': 'application/json'
                        //     },
                        //     method: 'POST'
                        // });
                    }
                });
                setRegistration(reg);
            });
        }
    }, []);

    const sendNotificationButtonOnClick = async (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-eq-null
        if (subscription == null) {
            console.error('web push not subscribed');

            return;
        }

        // will delete
        await fetch('/api/controllers/push-notifications/send-controller', {
            body: JSON.stringify({
                subscription
            }),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST'
        });
    };

    const handleClick = async () => {
        if (isSubscribed) {
            await subscription.unsubscribe();

            await fetch('/api/controllers/push-notifications/unsubscribe-controller', {
                body: JSON.stringify({
                    subscription
                }),
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST'
            });

            setSubscription(null);
            setIsSubscribed(false);
        } else {
            const sub = await registration.pushManager.subscribe({
                applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY),
                userVisibleOnly: true
            });

            await fetch('/api/controllers/push-notifications/subscribe-controller', {
                body: JSON.stringify({
                    subscription: sub
                }),
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST'
            });

            setSubscription(sub);
            setIsSubscribed(true);
        }
    };

    return (
        <>
            <StyledSubscribeButton>
                <label htmlFor={'subscribed'}>{'Subscribe'}</label>
                <StyledInput
                    id={'subscribed'}
                    name={'subscribed'}
                    onClick={handleClick}
                    type={'checkbox'}
                    value={'subscribed'}
                />
            </StyledSubscribeButton>
            <button disabled={!isSubscribed} onClick={sendNotificationButtonOnClick} type="button">
                Send Notification
            </button>
        </>
    );
};
