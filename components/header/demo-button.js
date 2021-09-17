import React from 'react';

import {StyledHeaderButton, StyledInput} from './header-styles';

export const DemoButton = ({isDemo, setIsDemo}) => (
    <StyledHeaderButton>
        <label htmlFor={'demo'}>{'Demo'}</label>
        <StyledInput id={'demo'} name={'demo'} onClick={() => setIsDemo(!isDemo)} type={'checkbox'} value={'demo'} />
    </StyledHeaderButton>
);
