import React from 'react'

import { Container, Content, Header, Inputs } from './styles'

import TextField from '../../components/TextField'

const SignIn: React.FC = () => {
  return (
    <Container>
      
      <Content>
        
        <Header>
          <h1>Login</h1>
          <span>Acesse para continuar</span>
        </Header>

        <Inputs>

          <TextField
            variant="outlined"
            label="E-mail" 
            inputProps={{ 
              defaultValue: 'matheusbaron10@gmail.com' 
            }} 
          />

          <TextField
            variant="outlined"
            label="Senha" 
            inputProps={{ 
              defaultValue: '12345',
              type: 'password'
            }} 
          />

          <div className='options-line' >
            <div className='remember-me' >
              <input type="checkbox"/>
              <p>Lembrar-me</p>
            </div>

            <a href="/"> Esqueci minha Senha </a>
          </div>
        
        </Inputs>

        <button>Entrar</button>

      </Content>

    </Container>
  )
}

export default SignIn