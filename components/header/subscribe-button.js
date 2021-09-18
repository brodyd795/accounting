import React, {useState, useEffect} from 'react';

import {base64ToUint8Array} from '../../utils/push-notification-helpers';

import {StyledHeaderButton, StyledInput} from './header-styles';

const updateSubscription = async ({isSubscribed, setIsSubscribed, subscription, setSubscription, registration}) => {
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

export const SubscribeButton = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((sub) => {
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        setSubscription(sub);
                        setIsSubscribed(true);
                    }
                });
                setRegistration(reg);
            });
        }
    }, []);

    const handleClick = () => {
        updateSubscription({
            isSubscribed,
            registration,
            setIsSubscribed,
            setSubscription,
            subscription
        });
    };

    return (
        <StyledHeaderButton>
            <StyledInput
                checked={isSubscribed}
                id={'subscribed'}
                name={'subscribed'}
                onChange={handleClick}
                type={'checkbox'}
                value={'subscribed'}
            />
            <label htmlFor={'subscribed'}>{'Subscribe'}</label>
        </StyledHeaderButton>
    );
};
