import styled from 'styled-components';

export const BlurrableTd = styled.td`
    ${({isDemo}) => isDemo && `
        color: transparent;
        text-shadow: 0 0 8px #000;
    `}}
`;
