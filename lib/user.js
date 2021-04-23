import React from 'react';
import fetch from 'isomorphic-unfetch';

let userState;

const User = React.createContext({
    loading: false,
    user: null
});

export const fetchUser = async () => {
    if (userState !== undefined) {
        return userState;
    }

    const res = await fetch('/api/auth/me');

    userState = res.ok ? await res.json() : null;

    return userState;
};

export const UserProvider = ({value, children}) => {
    const {user} = value;

    React.useEffect(() => {
        if (!userState && user) {
            userState = user;
        }
    }, [user]);

    return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => React.useContext(User);

export const useFetchUser = () => {
    const [data, setUser] = React.useState({
        loading: userState === undefined,
        user: userState || null
    });

    React.useEffect(() => {
        if (userState !== undefined) {
            return;
        }

        let isMounted = true;

        fetchUser().then((user) => {
            if (isMounted) {
                setUser({
                    loading: false,
                    user
                });
            }
        });

        // eslint-disable-next-line consistent-return
        return () => {
            isMounted = false;
        };
    }, []);

    return data;
};
