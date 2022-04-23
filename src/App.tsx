import Routes from './routes'
import GlobalStyle from './styles/global'
import { SnackbarProvider } from 'notistack'
import AppProvider from 'hooks'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { useContext } from 'react'
import { ThemeModeContext } from 'contexts/themeMode'
import { lightTheme, darkTheme } from 'styles/theme'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import 'services/interceptors/auth'

function App() {
  const { theme } = useContext(ThemeModeContext)
  return (
    <Provider store={store} >
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme} >
        <SnackbarProvider>
          <AppProvider>
            <Routes />
          </AppProvider>
        </SnackbarProvider>
        
        <CssBaseline />
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  )
}

export default App
