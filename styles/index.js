import styled, {css} from 'styled-components';

export const colors = {
    darkGreen: '#1f221b',
    darkGrey: '#383a37',
    green: '#6a905d',
    lightGreen: '#ecfbe6',
    lightGrey: '#bdc1bc'
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
    box-shadow: 2px 3px 4px grey;
`;

export const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 16px;
    padding: 20px 8px 32px;
    background-color: white;
    border-radius: 10px;
`;
