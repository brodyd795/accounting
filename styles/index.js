import {css} from 'styled-components';

export const colors = {
    green: '#729668',
    lightGreen: '#ecfbe6',
    darkGreen: '#1f221b',
    grey: '#a2a9a1'
};

export const buttonStyles = css`
    text-align: center;
    border-radius: 16px;
    border: transparent;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    background-color: ${colors.green};
    color: ${colors.lightGreen};
    display: flex;
    align-items: center;
    justify-content: center;
`;
