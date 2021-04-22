import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '../../pages';
import withAuth from '../../components/auth/with-auth';

jest.mock('../../components/auth/with-auth');

describe('Home', () => {
    let renderedInstance;

    const getComponent = () => withAuth.mock.calls[0][0];
    const renderComponent = () => {
        const Component = getComponent();

        renderedInstance = render(<Component />);
    };

    test('should render home page', () => {
        renderComponent();

        const {getByText} = renderedInstance;

        expect(getByText('Home')).toBeInTheDocument();
    });
});
