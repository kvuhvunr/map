import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

const rootNode = document.getElementById('root');
ReactDOM.createRoot(rootNode).render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </>
);
