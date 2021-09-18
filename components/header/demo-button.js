import React from 'react';

import {StyledHeaderButton, StyledInput} from './header-styles';

export const DemoButton = ({isDemo, setIsDemo}) => (
    <StyledHeaderButton>
        <StyledInput id={'demo'} name={'demo'} onClick={() => setIsDemo(!isDemo)} type={'checkbox'} value={'demo'} />
        <label htmlFor={'demo'}>{'Demo'}</label>
    </StyledHeaderButton>
);
