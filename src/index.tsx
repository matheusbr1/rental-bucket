import ReactDOM from 'react-dom'
import App from './App'
import { ThemeModeProvider } from 'contexts/themeMode'

ReactDOM.render(
  <ThemeModeProvider>
    <App />
  </ThemeModeProvider>, 
  document.getElementById('root')
)