import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Home from '../../pages/index';

describe('Home', () => {
    let renderedInstance;

    test('should render home page', () => {
        renderedInstance = render(<Home />);

        const {getByText} = renderedInstance;

        expect(getByText('Hom')).toBeInTheDocument();
    });
});
