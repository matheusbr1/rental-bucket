import React from 'react'
import Routes from './routes'
import GlobalStyle from './styles/global'
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <React.Fragment>
      <SnackbarProvider>
        <Routes />
      </SnackbarProvider>
      <GlobalStyle />
    </React.Fragment>
  )
}

export default App
