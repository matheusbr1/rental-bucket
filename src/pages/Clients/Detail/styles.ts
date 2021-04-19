import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .MuiRadio-colorSecondary.Mui-checked {
    color: #529A67
  }
`

export const Content = styled.main`

  position: relative;
  margin: 20px 0;

  width: 768px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  padding: 25px;

  h1 {
    margin: 10px 0;
    font-weight: 400;
    font-size: 1.5rem
  }

  h2 {
    margin: 30px 0;
    font-weight: 400;
    font-size: 1.2rem
  }

  form {
    margin: 5% 0 15% 0;

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
  }

  .floating-buttons {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
`

export const Divider = styled.div`
  margin: 30px 0;
  border-bottom: solid 1px #c2c2c2;
`