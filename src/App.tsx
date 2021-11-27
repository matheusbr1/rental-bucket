import Routes from './routes'
import GlobalStyle from './styles/global'
import { SnackbarProvider } from 'notistack'
import AppProvider from 'hooks'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { useContext } from 'react'
import { ThemeModeContext } from 'contexts/themeMode'
import { lightTheme, darkTheme } from 'styles/theme'

function App() {
  const { theme } = useContext(ThemeModeContext)

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme} >
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
