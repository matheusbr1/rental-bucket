import Routes from './routes'
import { SnackbarProvider } from 'notistack'
import AppProvider from 'hooks'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from 'styles/theme'
import { store } from "./redux/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store} >
      <ThemeProvider theme={theme} >
        <SnackbarProvider preventDuplicate disableWindowBlurListener >
          <AppProvider>
            <Routes />
          </AppProvider>
        </SnackbarProvider>
        
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  )
}

export default App
