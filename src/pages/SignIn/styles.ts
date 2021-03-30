import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #529A67;
`

export const Content = styled.div`
  background: #fff;
  border-radius: 15px;

  box-shadow: 6px 8px 4px rgba(0, 0, 0, 0.25);

  padding: 35px;

  display: flex; 
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 300px;
  height: 500px;
`
export const Header = styled.header`
  width: 100%;
  text-align: center;
`

export const Inputs = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;

  .options-line {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .remember-me {
      display: flex;
      align-items: center;
      font-size: 13px;
    }

    a {
      font-size: 13px;
      text-decoration: none;
      color: '#5C5C5C';
    }
  }
`