import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { createStyles } from '@material-ui/styles'
import Button from 'components/Button'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { signInSchema } from 'validations/signInSchema'
import { signIn } from 'store/user/user.actions'
import { Link, useLocation } from 'react-router-dom'
import { ISignInFields } from 'interfaces'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { sessionApi } from 'services/api'
import usePersistedState from 'hooks/usePersistedState'
import {
  Container,
  Typography,
  Card,
  Box,
  makeStyles,
  Grid,
  IconButton,
  InputAdornment,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => createStyles({
  content: {
    display: 'flex',
    width: '100%',
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
  const [, setTokens] = usePersistedState('@rentalbucket:tokens', null)

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const email = queryParams.get('email') ?? ''

  const history = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const classes = useStyles()

  const handleSignIn = useCallback(async ({ email, password }: ISignInFields) => {
    try {
      const { data } = await sessionApi.post('/sessions', { email, password })

      dispatch(signIn(data.user))

      setTokens({
        accessToken: String(data.token),
        refreshToken: String(data.refresh_token)
      })

      history.push('/works')
    } catch (error) {
      console.log(error)
      snackbar('Erro ao fazer login, tente novamente!', { variant: 'error' })
    }
  }, [dispatch, setTokens, history, snackbar])

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
              email,
              password: '',
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
                      type={isPasswordVisible ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setIsPasswordVisible(isVisible => !isVisible)}
                              edge="end"
                            >
                              {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} md={6} xl={6}>
                    <Link to='/create-company' >
                      Criar uma empresa
                    </Link>
                  </Grid>

                  <Grid item xs={6} md={6} xl={6}>
                    <Box display='flex' justifyContent='end' >
                      <Link to='/forgotPassword'>
                        Esqueci minha senha
                      </Link>
                    </Box>
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