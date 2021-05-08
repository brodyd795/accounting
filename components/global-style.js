import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, #__next {
        background-color: #fafff3;
        height: 100%;
        margin: 0;
        padding: 0;
        color: #0d1c03;
        font-family: "Helvetica Neue", Arial, sans-serif;
    }
`;

export default GlobalStyle;
