import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
    background-color: blue;
`;

export const Layout = ({children}) =>
    <StyledLayout>{children}</StyledLayout>;