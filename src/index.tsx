import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider, ThemeOptions, ThemeProvider } from '@mui/material'
import { responsiveFontSizes, createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  // ... any theme customiztion you can write here
}

const theme = responsiveFontSizes(createTheme(themeOptions))

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
)
