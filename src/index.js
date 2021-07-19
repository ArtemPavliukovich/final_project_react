import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/index';
import store from './store/store';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    background: none;
    outline: none;
    box-sizing: border-box;
    line-height: 1.2;
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
  }

  html {background: #800000;}

  *::before, *::after {box-sizing: border-box;}

  ol, ul {list-style: none;}

  a {
    text-decoration: none;
    color: inherit;
  }

  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section, label {
    display: block;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);