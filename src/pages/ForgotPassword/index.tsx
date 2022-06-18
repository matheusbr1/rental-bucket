import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import { createStyles } from '@material-ui/styles'
import Button from 'components/Button'
import { useSnackbar } from 'notistack'
import { Field, Form, Formik } from 'formik'
import FormikTextField from 'components/FormikTextField'
import { forgotPasswordSchema } from 'validations/forgotPasswordSchema'
import { Link } from 'react-router-dom'
import usePrivateApi from 'hooks/usePrivateApi'
import { 
  Container, 
  Typography, 
  Card, 
  Box, 
  makeStyles,
  Grid, 
} from '@material-ui/core'

interface IForgotPasswordFields {
  email: string
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
    '& h5': {
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

  const classes = useStyles()

  const handleSendForgotMail = useCallback(async ({ email }: IForgotPasswordFields) => {
    try {
      await api.post('/password/forgot', { email })
      
      snackbar('E-mail enviado com sucesso', { variant: 'success' })
      
      history.push('/')
    } catch (error) {
      snackbar('Erro ao enviar email, tente novamente!', { variant: 'error' })
    }
  }, [api, history, snackbar])

  return (
    <Container>
      <Box className={classes.content} >
        <Card className={classes.card} elevation={4} >
          <Typography variant='h1' >
            Esqueci minha senha
          </Typography>

          <Typography variant='h5' >
            Um email senha enviado com o link para a redefinição de senha
          </Typography>

          <Formik
            onSubmit={handleSendForgotMail}
            enableReinitialize
            validateOnChange
            validationSchema={forgotPasswordSchema}
            initialValues={{ email: '' }}
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
                      Enviar
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