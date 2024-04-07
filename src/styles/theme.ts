import { createTheme } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2'
    }
  },
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
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "&::-webkit-scrollbar-track": {
          backgroundColor: '#F4F4F4'
        },

        "::-webkit-scrollbar": {
          width: '6px',
          background: '#F4F4F4'
        },

        "::-webkit-scrollbar-thumb": {
          background: '#dad7d7'
        }
      }
    }
  }
})

export { theme }