import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledProvider } from 'styled-components';
import theme from './utils/theme';
import styled from './utils/styledTheme';
import ReactGA4 from "react-ga4";

ReactGA4.initialize("G-EJ4EVEBK9R");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledProvider theme={styled}>
        <App />
      </StyledProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

