import {conn} from './transaction-wrapper-repository';

export const subscribeRepository = ({endpoint, keys: {p256dh, auth}}) =>
    conn().query(
        `
            INSERT INTO
                subscriptions (endpoint, private_key, auth)
            VALUES
                (?, ?, ?)

		`,
        [endpoint, p256dh, auth]
    );

export const unsubscribeRepository = ({keys: {p256dh}}) =>
    conn().query(
        `
            DELETE FROM
                subscriptions
            WHERE
                private_key = ?
		`,
        [p256dh]
    );

export const getSubscriptionsRepository = () =>
    conn().query(
        `
            SELECT
                *
            FROM
                subscriptions
        `
    );
