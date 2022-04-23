import Routes from './routes'
import { SnackbarProvider } from 'notistack'
import AppProvider from 'hooks'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { theme } from 'styles/theme'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthInterceptor } from 'services/interceptors/Auth'

function App() {
  return (
    <Provider store={store} >
      <ThemeProvider theme={theme} >
        <SnackbarProvider preventDuplicate >
          <AuthInterceptor>
            <AppProvider>
              <Routes />
            </AppProvider>
          </AuthInterceptor>
        </SnackbarProvider>
        
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  )
}

export default App
