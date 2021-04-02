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
  width: 100%;
  margin: 20px 0;

  display: flex;
  justify-content: center;

  .floating-buttons {
    display: flex;
    position: fixed;
    bottom: 15px;
    right: 30px;
  }
`