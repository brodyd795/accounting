import {createGlobalStyle} from 'styled-components';

import {colors} from '../styles';

const GlobalStyle = createGlobalStyle`
    html, body, #__next {
        background-color: ${colors.lightGreen};
        height: 100%;
        margin: 0;
        padding: 0;
        color: ${colors.darkGreen};
        font-family: "Helvetica Neue", Arial, sans-serif;
    }
`;

export default GlobalStyle;
