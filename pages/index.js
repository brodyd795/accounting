import React from 'react';

import withAuth from '../components/auth/with-auth';
import {Home} from '../components/home';

const Index = () => <Home />;

export default withAuth(Index);
