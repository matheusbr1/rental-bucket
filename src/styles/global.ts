import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4 {
    margin: 0;
  }

  button.MuiPickersDay-daySelected {
    background-color: #529A67
  }

  button.MuiPickersDay-daySelected:hover {
    background-color: #529A67
  }
`