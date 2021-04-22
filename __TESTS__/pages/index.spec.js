import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Index from '../../pages';
import withAuth from '../../components/auth/with-auth';
import {Home} from '../../components/home';

jest.mock('../../components/auth/with-auth');
// eslint-disable-next-line react/display-name
jest.mock('../../components/home', () => () => (
    <div>{'home-component'}</div>
));

describe('Index', () => {
    let renderedInstance;

    const getComponent = () => withAuth.mock.calls[0][0];
    const renderComponent = () => {
        const Component = getComponent();

        renderedInstance = render(<Component />);
    };

    test('should render home page', () => {
        renderComponent();

        const {getByText} = renderedInstance;

        expect(getByText('home-component')).toBeInTheDocument();
    });
});
