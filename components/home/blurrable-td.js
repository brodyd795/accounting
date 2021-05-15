import styled from 'styled-components';

export const BlurrableTd = styled.td`
    color: ${({isNegative, isDemo}) => {
        if (isDemo) {
            return 'transparent';
        } else if (isNegative) {
            return 'red';
        }

        return 'black';
    }};

    text-shadow: ${({isDemo}) => (isDemo ? '0 0 8px #000' : '')};
`;
