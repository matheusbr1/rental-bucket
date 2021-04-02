import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Content = styled.main`

  position: relative;

  margin: 20px 0;

  width: 768px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  padding: 25px;

  h1 {
    margin: 10px;
    font-weight: 400;
    font-size: 1.5rem
  }

  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 5% 0 15% 0;
  }

  .floating-buttons {
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
`