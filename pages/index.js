import React from 'react';
import Link from 'next/link';
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';

const Home = () => {
    const { user, error, isLoading } = useUser();
    console.log(`user`, user)

    return (
        <div>
                    <header>
            <nav>
                <ul>
                <li>
                    <Link href="/">
                    <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/protected-page">
                    <a>Protected Page</a>
                    </Link>
                </li>
                {user ? (
                    <>
                    <li>
                        <a href="/api/auth/logout" data-testid="logout">
                        Logout
                        </a>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <a href="/api/auth/login" data-testid="login">
                        Login
                        </a>
                    </li>
                    </>
                )}
                </ul>
            </nav>
            </header>
            {isLoading && <p>Loading login info...</p>}

            {error && (
            <>
                <h4>Error</h4>
                <pre>{error.message}</pre>
            </>
            )}
    
            {user && (
            <>
                <h4>Rendered user info on the client</h4>
                <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
            </>
            )}
    
            {!isLoading && !error && !user && (
            <>
                <p>
                To test the login click in <i>Login</i>
                </p>
                <p>
                Once you have logged in you should be able to click in <i>Protected Page</i> and <i>Logout</i>
                </p>
            </>
            )}
        </div>
    );
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
