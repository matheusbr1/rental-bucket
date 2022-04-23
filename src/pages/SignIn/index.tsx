import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { createStyles } from '@material-ui/styles'
import Button from 'components/Button'
import { api } from 'services/api'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { signInSchema } from 'validations/signInSchema'
import { ISignInFields } from 'interfaces'
import { signIn } from 'redux/user/user.actions'
import { Link } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  Card, 
  Box, 
  makeStyles,
  Grid, 
} from '@material-ui/core'
import { useCookies } from 'react-cookie'

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

  const dispatch = useDispatch()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [, setCookies] = useCookies(['rentalbucket.token'])

  const classes = useStyles()

  const handleSignIn = useCallback(async ({ email, password }: ISignInFields) => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      dispatch(signIn(data.user))

      setCookies('rentalbucket.token', String(data.token))

      history.push('/works')
    } catch (error) {
      snackbar('Erro ao fazer login, tente novamente!', { variant: 'error' })
    }
  }, [dispatch, setCookies, history, snackbar])

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

          <Formik
            onSubmit={handleSignIn}
            enableReinitialize
            validateOnChange
            validationSchema={signInSchema}
            initialValues={{
              email: '',
              password: ''
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={3} >
                  <Grid item xs={12} md={12} xl={12} >
                    <Field
                      component={FormikTextField}
                      label='E-mail'
                      id='email'
                      name='email'
                    />
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} >
                    <Field
                      component={FormikTextField}
                      label='Senha'
                      id='password'
                      name='password'
                      type='password'
                    />
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} >
                    <Link to='/signup' >
                      Criar um usuário
                    </Link>
                  </Grid>
                  
                  <Grid item xs={12} md={12} xl={12} >
                    <Button 
                      color='primary' 
                      type='submit'
                      loading={isSubmitting} 
                    >
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </Container>
  )
}

export default SignIn