import React from 'react';
import styled from 'styled-components';

import {DemoProvider, useDemo} from '../hooks/use-demo';

const StyledLayout = styled.div`
    height: 100%;
    width: 100%;
`;

const StyledHeader = styled.div`
    text-align: center;
    background-color: #c5ffb6;
    padding: 10px 0;
    display: flex;
    flex: 1;
    justify-content: space-between;
    
    h1 {
        margin: 0;
    }
`;

const StyledH1Container = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    flex: 1;
`;

const StyledDemoButton = styled.div`
    display: flex;
    align-items: center;
`;

const StyledMain = styled.main``;

const Header = () => {
    const {isDemo, setIsDemo} = useDemo();

    return (
        <StyledHeader>
            <StyledH1Container>
                <h1>{'Accounting'}</h1>
            </StyledH1Container>
            <StyledDemoButton>
                <label
                    htmlFor={'demo'}
                >
                    {'Demo'}
                </label>
                <input
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
            <StyledMain>
                {children}
            </StyledMain>
        </DemoProvider>
    </StyledLayout>
);
