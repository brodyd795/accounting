import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const StyledModal = styled(ReactModal)`
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #111311;
    width: 300px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
`;

const StyledModalHeader = styled.div`
    text-align: center;
    position: relative;
`;

const StyledModalBody = styled.div`
    flex: 1;
    align-items: center;
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
    color: white;
    cursor: pointer;
`;

export const Modal = ({title, onRequestClose, isOpen, children}) => (
    <StyledModal ariaHideApp={false} contentLabel={title} isOpen={isOpen} onRequestClose={onRequestClose}>
        <StyledModalHeader>
            <StyledModalHeading>{title}</StyledModalHeading>
            <StyledCloseModalButton onClick={onRequestClose} type={'button'}>
                {'X'}
            </StyledCloseModalButton>
        </StyledModalHeader>
        <StyledModalBody>{children}</StyledModalBody>
    </StyledModal>
);
