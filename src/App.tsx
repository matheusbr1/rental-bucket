import React from 'react'
import Routes from './routes'
import GlobalStyle from './styles/global'
import { SnackbarProvider } from 'notistack';
import AppProvider from 'hooks'

function App() {
  return (
    <React.Fragment>
      <SnackbarProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SnackbarProvider>
      <GlobalStyle />
    </React.Fragment>
  )
}

export default App
