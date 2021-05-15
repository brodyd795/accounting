import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const StyledModal = styled(ReactModal)`
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    width: 300px;
`;

const StyledModalHeader = styled.div`
    text-align: center;
    position: relative;
`;

const StyledModalHeading = styled.span`
    font-size: 20px;
`;

const StyledCloseModalButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    border: none;
    margin-top: 5px;
`;

export const Modal = ({title, onRequestClose, isOpen, children}) => (
    <StyledModal ariaHideApp={false} contentLabel={title} isOpen={isOpen} onRequestClose={onRequestClose}>
        <StyledModalHeader>
            <StyledModalHeading>{title}</StyledModalHeading>
            <StyledCloseModalButton onClick={onRequestClose} type={'button'}>
                {'X'}
            </StyledCloseModalButton>
            {children}
        </StyledModalHeader>
    </StyledModal>
);
