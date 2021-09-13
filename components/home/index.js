import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

import {AccountsSummaryTable} from './accounts-summary-table';
import {UnseenTransactionsTable} from './unseen-transactions-table';
import {Search} from './search';

const StyledContainer = styled.div`
    flex: 1;
    margin: 0 auto;
    padding-bottom: 10px;
    max-width: 1000px;
    width: 100%;
`;

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

export const Home = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            // run only in browser
            console.log(`navigator`, navigator);
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((sub) => {
                    console.log(`sub`, sub);

                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        setSubscription(sub);
                        setIsSubscribed(true);
                    }
                });
                setRegistration(reg);
            });
        }
    }, []);

    const subscribeButtonOnClick = async (event) => {
        event.preventDefault();
        console.log('here');
        console.log(`registration`, registration);

        const sub = await registration.pushManager.subscribe({
            applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY),
            userVisibleOnly: true
        });

        // TODO: you should call your API to save subscription data on server in order to send web push notification from server
        setSubscription(sub);
        setIsSubscribed(true);

        console.log('web push subscribed!');
        console.log(sub);
    };

    const unsubscribeButtonOnClick = async (event) => {
        event.preventDefault();
        await subscription.unsubscribe();
        // TODO: you should call your API to delete or invalidate subscription data on server
        setSubscription(null);
        setIsSubscribed(false);
        console.log('web push unsubscribed!');
    };

    const sendNotificationButtonOnClick = async (event) => {
        event.preventDefault();

        // eslint-disable-next-line no-eq-null
        if (subscription == null) {
            console.error('web push not subscribed');

            return;
        }

        console.log(`JSON.stringify(subscription)`, JSON.stringify(subscription));

        await fetch('/api/notification', {
            body: JSON.stringify({
                subscription
            }),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST'
        });
    };

    return (
        <StyledContainer>
            <button disabled={isSubscribed} onClick={subscribeButtonOnClick} type="button">
                Subscribe
            </button>
            <button disabled={!isSubscribed} onClick={unsubscribeButtonOnClick} type="button">
                Unsubscribe
            </button>
            <button disabled={!isSubscribed} onClick={sendNotificationButtonOnClick} type="button">
                Send Notification
            </button>
            <AccountsSummaryTable />
            <UnseenTransactionsTable />
            <Search />
        </StyledContainer>
    );
};
