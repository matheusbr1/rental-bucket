import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  margin: 20px 0;
  width: 768px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  padding: 25px;

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
    justify-content: space-between;

    position: absolute;
    bottom: 25px;
    left: 25px;
    right: 25px;

    .group {
      display: flex;
    }
  }
`