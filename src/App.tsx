import Routes from './routes'
import GlobalStyle from './styles/global'
import { SnackbarProvider } from 'notistack';
import AppProvider from 'hooks'

function App() {
  return (
    <>
      <SnackbarProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SnackbarProvider>
      <GlobalStyle />
    </>
  )
}

export default App
