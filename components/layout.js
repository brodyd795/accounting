import React, {useState} from 'react';
import styled from 'styled-components';

import GearIcon from '../public/icons/cog-solid.svg';
import {DemoProvider, useDemo} from '../hooks/use-demo';

import {DemoButton} from './header/demo-button';
import {SubscribeButton} from './header/subscribe-button';
import {Modal} from './home/modals/modal';

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
    flex-direction: column;
`;

const StyledSettingsButton = styled.button`
    cursor: pointer;
    margin-right: 8px;
    background-color: transparent;
    border: none;

    svg {
        display: inline-block;
        height: 20px;
        vertical-align: middle;
        width: 20px;

        path {
            fill: #fafff3;
        }
    }
`;

const StyledDemoBanner = styled.div`
    text-align: center;
    background-color: #d0c25c;
    color: #0e0e02;
    padding: 4px;
`;

const Header = () => {
    const {isDemo, setIsDemo} = useDemo();
    const [showSettingsButtons, setShowSettingsButtons] = useState(false);

    return (
        <>
            <StyledHeader>
                <StyledH1>{'Accounting'}</StyledH1>
                <StyledSettingsButton onClick={() => setShowSettingsButtons(!showSettingsButtons)} type={'button'}>
                    <GearIcon />
                </StyledSettingsButton>
                {showSettingsButtons && (
                    <Modal
                        isOpen={showSettingsButtons}
                        onRequestClose={() => setShowSettingsButtons(!showSettingsButtons)}
                        title={'Settings'}
                    >
                        <StyledButtons>
                            <DemoButton isDemo={isDemo} setIsDemo={setIsDemo} />
                            <SubscribeButton />
                        </StyledButtons>
                    </Modal>
                )}
            </StyledHeader>
            {isDemo && <StyledDemoBanner>{'Demo mode activated!'}</StyledDemoBanner>}
        </>
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
