import React, { useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'
import { createStyles } from '@material-ui/styles'
import Button from 'components/Button'
import { useSnackbar } from 'notistack'
import { Field, Form, Formik } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { Link } from 'react-router-dom'
import { resetPasswordSchema } from 'validations/resetPasswordSchema'
import usePrivateApi from 'hooks/usePrivateApi'
import { 
  Container, 
  Typography, 
  Card, 
  Box, 
  makeStyles,
  Grid, 
} from '@material-ui/core'

interface IResetPasswordFields {
  password: string
}

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
      marginBottom: theme.spacing(2),
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
  const api = usePrivateApi()

  const history = useHistory()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const { search: params } = useLocation()

  const classes = useStyles()

  const handleSignUp = useCallback(async ({ password }: IResetPasswordFields) => {
    try {
      await api.post('/password/reset', { password }, {
       params: {
         token: params.replace('?token=', '')
       }
      })
      
      snackbar('Nova senha criada com sucesso, faça login!', { variant: 'success' })
      
      history.push('/')
    } catch (error) {
      snackbar('Erro ao criar senha, tente novamente!', { variant: 'error' })
    }
  }, [api, history, params, snackbar])

  return (
    <Container>
      <Box className={classes.content} >
        <Card className={classes.card} elevation={4} >
          <Typography variant='h1' >
            Recuperação de senha
          </Typography>

          <Typography variant='h3' >
            Escolha uma nova senha
          </Typography>

          <Formik
            onSubmit={handleSignUp}
            enableReinitialize
            validateOnChange
            validationSchema={resetPasswordSchema}
            initialValues={{ password: '' }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={3} >
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
                      Alterar
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