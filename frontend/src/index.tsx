import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouter } from './AppRouter';
import { NotificationProvider } from './components/NotificationProvider/NotificationProvider';

const themeOptions = {
  palette: {
    primary: {
      main: '#CD6538',
      dark: '#CD6538'
    },
    secondary: {
      main: '#EDF2F4',
      dark: '#EDF2F4'
    }
  }
};

const theme = createTheme(themeOptions);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <AppRouter></AppRouter>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
