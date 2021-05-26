import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import App from './frontend/App'
import reportWebVitals from './frontend/reportWebVitals'

const customTheme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 48,
    },
    drawer: {
      width: 240,
    },
  },
  palette: {
    primary: {
      main: '#1A535C',
      contrastText: '#F7FFF7',
    },
    secondary: {
      main: '#FFE047',
      contrastText: '#1A535C',
    },
    error: {
      main: '#FF6B6B',
      contrastText: '#F7FFF7',
    },
    warning: {
      main: '#FFE66D',
      contrastText: '#1A535C',
    },
    info: {
      main: '#24737F',
      contrastText: '#F7FFF7',
    },
    success: {
      main: '#5892DA',
      contrastText: '#F7FFF7',
    },
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiList: {
      dense: true,
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiRadio: {
      color: 'primary',
    },
    MuiSwitch: {
      color: 'primary',
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
