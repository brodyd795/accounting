import React from 'react';

import {StyledHeaderButton, StyledInput, StyledLabel} from './header-styles';

export const DemoButton = ({isDemo, setIsDemo}) => (
    <StyledHeaderButton>
        <StyledInput id={'demo'} name={'demo'} onClick={() => setIsDemo(!isDemo)} type={'checkbox'} value={'demo'} />
        <StyledLabel htmlFor={'demo'}>{'Demo'}</StyledLabel>
    </StyledHeaderButton>
);
