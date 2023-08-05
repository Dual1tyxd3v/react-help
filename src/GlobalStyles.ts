import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-main-bg: #202020;
    --color-tab-bg: #241800;
    --color-tab-main-active: #462f03;
    --color-main-active: #dc9b1b;
    --color-main-light: #face77;
    --color-content-active: #f5dcaa;
    --color-content-bg: #4b4a4a;
    --color-light-grey: #b6b2b2;
    --color-green: #0a9c2a;
    --color-green-light: #82f59b;
  }

  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;
    background-repeat: no-repeat;
    box-sizing: border-box;
    font-family: "Manrope", sans-serif;
    font-style: normal;
  }

  ul{
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 100%;
    height: auto;
  }

  .visually-hidden {
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    border: none;
    position: absolute;
    clip: rect(0,0,0,0);
  }

  html {
    font-size: 62.5%;
    padding: 3vh 0;
    font-family: sans-serif;
    color: var(--color-main-light);
    transition: .2s all;
  }

  body {
    background-color: #000;
  }

  hr {
    margin: .5rem 0;
  }

  sup {
    border: 2px solid var(--color-green);
    border-radius: 11px;
    width: 21px;
    text-align: center;
    font-weight: bold;
    display: inline-block;
  }

  pre {
    background-color: var(--color-light-grey);
    color: var(--color-main-bg);
    margin: .5rem 1rem;
    border-radius: 5px;
    padding: 1rem;
    font-weight: 600;
  }
`;

export default GlobalStyles;
