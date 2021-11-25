import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  div[class*='SnackbarItem-variantSuccess'] {
    background-color: #529A67 !important;
  }

  div[class*='SnackbarItem-variantError'] {
    background-color: #F50057 !important;
  }

  ::-webkit-scrollbar-track {
    background-color: #F4F4F4;
  }

  ::-webkit-scrollbar {
    width: 6px;
    background: #F4F4F4;
  }

  ::-webkit-scrollbar-thumb {
    background: #dad7d7;
  }
`