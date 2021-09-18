import styled from 'styled-components';

export const BlurrableTd = styled.td`
    color: ${({isNegative, isDemo}) => {
        if (isNegative && !isDemo) {
            return 'red';
        }

        return 'black';
    }};
`;
