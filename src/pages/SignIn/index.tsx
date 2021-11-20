import React, { useCallback } from 'react'
import { Container, Content } from './styles'
import truckIlustration from 'assets/truckIlustration.svg'
import googleLogo from 'assets/googleLogo.svg'
import Button from 'components/Button'
import { useGoogleLogin } from 'react-use-googlelogin'
import { useHistory } from 'react-router'

const SignIn: React.FC = () => {
  const googleAuth = useGoogleLogin({
    // clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID as string
    clientId: '745815052969-p903q9vcfpgb21vtc8egf7fg86ihu425.apps.googleusercontent.com'
  })

  const history = useHistory()

  const handleSignIn = useCallback(async () => {
    const { signIn } = googleAuth

    const user = await signIn()

    console.log(user)

    user && history.push('/works')
  }, [googleAuth, history])

  return (
    <Container>
      <Content>
          
        <img src={truckIlustration} alt='truck' />
        
        <main>
          <h1>
            Faça Login Para  <br /> 
            Acessar a Plataforma 
          </h1>

          <Button style={{
              color: 'rgba(0, 0, 0, 0.54)',
              background: '#fff',
              padding: '0.7rem 2.5rem',
              fontWeight: 'bold',
              borderRadius: 8,
              fontSize: 20
            }}
            onClick={handleSignIn}
          >
            <img src={googleLogo} alt="Google" style={{
              marginRight: 10
            }}/>
            
            Entrar com o Google
          </Button>
        </main>
      </Content>
    </Container>
  )
}

export default SignIn