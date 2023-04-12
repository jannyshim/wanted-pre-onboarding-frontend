import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #D3CEDF
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    max-width: 80%;
    margin: 0 auto;
  }
`;

export default GlobalStyle;
