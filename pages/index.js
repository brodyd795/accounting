import React from 'react';

import withAuth from '../components/auth/with-auth';

const Home = () => <div>{'Home'}</div>;

export default withAuth(Home);
