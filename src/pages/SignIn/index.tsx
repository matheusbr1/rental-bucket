import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Checkbox } from '@material-ui/core'
import { Form } from '@unform/web'

import TextField from 'components/TextField'
import Button from 'components/Button'

import { Container, Content, Header, Inputs } from './styles'
import { FormHandles } from '@unform/core'

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null)

  const history = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [isRemeberInputsActive, setIsRememberInputsActive] = useState(false)

  const handleRememberInputs = useCallback(() => {
    setIsRememberInputsActive(state => !state)
  }, [])

  const [loading, setLoading] = useState(false)

  const handleSignIn = useCallback((fields) => {

    console.log('fields', fields)

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

        <Form ref={formRef} onSubmit={handleSignIn} >
          <Inputs>
            <TextField
              variant="outlined"
              label="E-mail" 
              name="email" 
              inputProps={{ 
                defaultValue: 'matheusbaron10@gmail.com' 
              }} 
            />

            <TextField
              variant="outlined"
              label="Senha" 
              name="password" 
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

          <Button type='submit' onClick={handleSignIn} loading={loading} >
            Entrar
          </Button>
        </Form>

      </Content>

    </Container>
  )
}

export default SignIn