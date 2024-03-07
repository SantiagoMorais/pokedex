import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Exo 2", sans-serif;
    }

    a {
        text-decoration: none;
    }

    li {
        list-style: none;
    }

    input {
        outline: none;
    }
`