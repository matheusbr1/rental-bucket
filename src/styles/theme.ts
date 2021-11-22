import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontWeight: 500,
      fontSize: '2rem',
      lineHeight: '2.3rem'
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: '1.5rem'
    },
    h3: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem'
    },
    h4: {
      fontSize: '1.2rem',
      lineHeight: '1.5rem'
    },
    h5: {
      fontSize: '1rem',
      lineHeight: '1.25rem'
    },
    h6: {
      fontWeight: 'normal',
      fontSize: '0.87rem',
      lineHeight: '1.25rem'
    },
    subtitle1: {
      fontWeight: 'normal',
      fontSize: '0.85rem',
      lineHeight: '1.2rem'
    },
    subtitle2: {
      fontWeight: 'normal',
      fontSize: '0.8rem',
      lineHeight: '1.2rem'
    },
    caption: {
      fontWeight: 'normal',
      fontSize: '0.72rem',
      lineHeight: '0.9rem'
    },
    button: {
      fontWeight: 'bold'
    }
  },
}

export const theme = createMuiTheme({
  ...themeOptions,
  palette: {
    primary: {
      main: '#529A67', 
    },
  }
})