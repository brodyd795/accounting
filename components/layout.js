import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
    height: 100%;
    width: 100%;
`;

export const Layout = ({children}) =>
    <StyledLayout>{children}</StyledLayout>;