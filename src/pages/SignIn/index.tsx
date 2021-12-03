import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { createStyles } from '@material-ui/styles'
import Button from 'components/Button'
import { 
  Container, 
  Typography, 
  Card, 
  Box, 
  makeStyles, 
  TextField 
} from '@material-ui/core'

const useStyles = makeStyles((theme) => createStyles({
  content: {
    display: 'flex',
    width:  '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: theme.spacing(4),
    maxWidth: 500,
    '& h1': {
      marginBottom: theme.spacing(1),
    },
    '& h3': {
      marginBottom: theme.spacing(2),
    },
    '& > div': {
      marginBottom: theme.spacing(2),
    } 
  }
}))

const SignIn: React.FC = () => {
  const history = useHistory()

  const classes = useStyles()

  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = useCallback(async () => {
    await new Promise(resolve => {
      setIsLoading(true)
      return setTimeout(() => history.push('/works'), 3000)
    })
  }, [history])

  return (
    <Container>
      <Box className={classes.content} >
        <Card className={classes.card} elevation={4} >
          <Typography variant='h1' >
            Login
          </Typography>

          <Typography variant='h3' >
            Faça login para acessar a plataforma
          </Typography>

          <TextField
            fullWidth
            label='E-mail'
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Senha'
            type='password'
            variant='outlined'
          />

          <Button color='primary' onClick={handleSignIn} loading={isLoading} >
            Entrar
          </Button>
        </Card>
      </Box>
    </Container>
  )
}

export default SignIn