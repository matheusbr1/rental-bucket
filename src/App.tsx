import Routes from './routes'
import GlobalStyle from './styles/global'
import { SnackbarProvider } from 'notistack'
import AppProvider from 'hooks'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from 'styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme} >
      <SnackbarProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </SnackbarProvider>
      
      <CssBaseline />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
