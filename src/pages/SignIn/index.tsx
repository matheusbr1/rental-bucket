import React, { useCallback, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Checkbox } from '@material-ui/core'

import TextField from 'components/TextField'
import Button from 'components/Button'

import { Container, Content, Header, Inputs } from './styles'

const SignIn: React.FC = () => {

  const history = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [isRemeberInputsActive, setIsRememberInputsActive] = useState(false)

  const handleRememberInputs = useCallback(() => {
    setIsRememberInputsActive(state => !state)
  }, [])

  const [loading, setLoading] = useState(false)

  const handleSignIn = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      history.push('/services')

      setLoading(false)
    }, 2000)
  }, [history])  

  const handleForgotPassword = useCallback(() => {
    
    enqueueSnackbar('Entre em contato com o administrador!', {
      variant: 'info'
    })

  }, [enqueueSnackbar])

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
             
              <Checkbox
                checked={isRemeberInputsActive}
                onChange={handleRememberInputs}
                style={{  
                  color: '#529A67'
                }}
              />

              <p>Lembrar-me</p>
            </div>

            <Link to="/" onClick={handleForgotPassword} > Esqueci minha Senha </Link>
          </div>
        
        </Inputs>

        <Button onClick={handleSignIn} loading={loading} >
          Entrar
        </Button>

      </Content>

    </Container>
  )
}

export default SignIn