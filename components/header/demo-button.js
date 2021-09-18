import React from 'react';

import {StyledHeaderButton} from './header-styles';

export const DemoButton = ({isDemo, setIsDemo}) => (
    <StyledHeaderButton onClick={() => setIsDemo(!isDemo)} type={'button'}>
        {isDemo ? 'Normal' : 'Demo'}
    </StyledHeaderButton>
);
