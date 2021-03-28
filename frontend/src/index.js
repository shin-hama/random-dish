import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import App from './App'
import reportWebVitals from './reportWebVitals'

const customTheme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
  // Set TEL brand color: cyan and green
  palette: {
    primary: {
      main: '#00A9E0',
      contrastText: 'white',
    },
    secondary: {
      main: '#78BE20',
    },
    error: {
      main: '#DA1884',
    },
    warning: {
      main: '#FF6A13',
    },
    info: {
      main: '#8031A7',
    },
    success: {
      main: '#00B2A9',
    },
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiList: {
      dense: true,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={customTheme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
