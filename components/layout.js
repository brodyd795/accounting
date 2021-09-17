import React from 'react';
import styled from 'styled-components';

import {DemoProvider, useDemo} from '../hooks/use-demo';

import {DemoButton} from './header/demo-button';
import {SubscribeButton} from './header/subscribe-button';

const StyledLayout = styled.div`
    height: 100%;
    width: 100%;
`;

const StyledHeader = styled.div`
    text-align: center;
    background-color: #4f7744;
    padding: 10px 0;
    display: flex;
    flex: 1;
    justify-content: space-between;

    h1 {
        margin: 0;
    }
`;

const StyledH1 = styled.h1`
    padding-left: 8px;
`;

const StyledButtons = styled.div`
    display: flex;
`;

const Header = () => {
    const {isDemo, setIsDemo} = useDemo();

    return (
        <StyledHeader>
            <StyledH1>{'Accounting'}</StyledH1>
            <StyledButtons>
                <DemoButton isDemo={isDemo} setIsDemo={setIsDemo} />
                <SubscribeButton />
            </StyledButtons>
        </StyledHeader>
    );
};

export const Layout = ({children}) => (
    <StyledLayout>
        <DemoProvider>
            <Header />
            <main>{children}</main>
        </DemoProvider>
    </StyledLayout>
);
