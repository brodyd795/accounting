import React from 'react';
import styled from 'styled-components';

import {DemoProvider, useDemo} from '../hooks/use-demo';

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

const StyledDemoButton = styled.div`
    display: flex;
    align-items: center;
`;

const StyledInput = styled.input`
    margin-right: 8px;
`;

const Header = () => {
    const {isDemo, setIsDemo} = useDemo();

    return (
        <StyledHeader>
            <StyledH1>{'Accounting'}</StyledH1>
            <StyledDemoButton>
                <label
                    htmlFor={'demo'}
                >
                    {'Demo'}
                </label>
                <StyledInput
                    id={'demo'}
                    name={'demo'}
                    onClick={() => setIsDemo(!isDemo)}
                    type={'checkbox'}
                    value={'demo'}
                />
            </StyledDemoButton>
        </StyledHeader>
    )
}

export const Layout = ({children}) => (
    <StyledLayout>
        <DemoProvider>
            <Header />
            <main>
                {children}
            </main>
        </DemoProvider>
    </StyledLayout>
);
