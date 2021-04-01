import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .floating-buttons {
    display: flex;
    position: fixed;
    bottom: 15px;
    right: 30px;
  }
`