import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';



const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: `#370000`,
      darker: '#380606',
    },
    secondary: {
      main: `#d1086b`,
      darker: '#92054a'
    },
    error: {
      main: `#ff0000`,
    },
    warning: {
      main: `#ff0000`,
    },
    info: {
      main: `#3399ff`,
      darker: '#053e85',
    },
    edit: {
      main: `#950000`,
      darker: '#053e85',
    },
    add: {
      main: `#950000`,
      darker: '#053e85',
    },
    load: {
      main: `#950000`,
      darker: '#053e85',
    },
    delete:{
      main: `#950000`,
      darker: '#053e85',
    },
    nav: {
      main: '#b44c4c',
    },
    red: {
      main: '#f44336',
    },

  },

  typography: {
    fontFamily: [
      'Arial', 
      'Lato',
      'Roboto',
      'Helvetica',
      'Montserrat',
      'Nunito Sans',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  
  
});


root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>

);

reportWebVitals();
