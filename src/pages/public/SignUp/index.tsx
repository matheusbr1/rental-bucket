import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { createStyles } from '@material-ui/styles'
import Button from 'components/Button'
import usePrivateApi from 'hooks/usePrivateApi'
import { useSnackbar } from 'notistack'
import { Field, Form, Formik } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { signInSchema } from 'validations/signInSchema'
import { Link, useLocation } from 'react-router-dom'
import {
  Container,
  Typography,
  Card,
  Box,
  makeStyles,
  Grid,
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

export interface ISignUpFields {
  name: string
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const api = usePrivateApi()

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const companyId = queryParams.get('company_id')

  const history = useHistory()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const classes = useStyles()

  const handleSignUp = useCallback(async ({ name, email, password }: ISignUpFields) => {
    try {
      await api.post('/users', {
        name,
        email,
        password,
        company_id: companyId
      })

      snackbar('Novo usuário criado, faça login!', { variant: 'success' })

      history.push(`/?email=${email}`)
    } catch (error) {
      snackbar('Erro ao criar o usuário, tente novamente!', { variant: 'error' })
    }
  }, [api, history, snackbar, companyId])

  return (
    <Container>
      <Box className={classes.content} >
        <Card className={classes.card} elevation={4} >
          <Typography variant='h1' >
            Novo usuário
          </Typography>

          <Typography variant='h3' >
            Crie o primeiro usuário para sua empresa
          </Typography>

          <Formik
            onSubmit={handleSignUp}
            enableReinitialize
            validateOnChange
            validationSchema={signInSchema}
            initialValues={{
              name: '',
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
                      label='Nome'
                      id='name'
                      name='name'
                    />
                  </Grid>

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
                    <Link to='/' >
                      Voltar para o login
                    </Link>
                  </Grid>

                  <Grid item xs={12} md={12} xl={12} >
                    <Button
                      color='primary'
                      type='submit'
                      loading={isSubmitting}
                    >
                      Criar
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