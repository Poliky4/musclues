import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: sans-serif;
    font-size: 10px;
  }

  html,
  body {
    height: 100%;
    background-color: black;
  }
`;
