import styled from 'styled-components';

export const DemoableTd = styled.td`
    color: ${({isNegative, isDemo}) => {
        if (isNegative && !isDemo) {
            return 'red';
        }

        return 'black';
    }};
`;
