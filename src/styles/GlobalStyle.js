import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    background-color: #f0f0f0;
  }

  input, button {
    padding: 10px;
    font-size: 16px;
  }
`;
