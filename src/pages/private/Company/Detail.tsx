import React, { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { Grid, Typography } from '@material-ui/core'
import { FormStatus, ICompany } from 'interfaces'
import { Formik, Form } from 'formik'
import Loading from 'components/Loading'
import { FormContainer } from 'components/layout/FormContainer'
import DriverFormCore from './components/FormCore'
import { DriverFormFooter } from './components/FormFooter'
import { useCompany } from 'hooks/useCompany'

const Detail: React.FC = () => {
  const { push, goBack } = useHistory()

  const { company } = useCompany()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [formStatus, setFormStatus] = useState<FormStatus>('isViewing')

  const [loading, setLoading] = useState(false)

  const handleEdit = useCallback(async (fields: ICompany) => {
    try {
      console.log('Data', fields)

      setLoading(true)

      // Updating company

      push('/works')

      snackbar('Empresa editado com sucesso', {
        variant: 'success'
      })
    } catch (error) {
      console.log(error)

      snackbar('Erro ao editar empresa, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [push, snackbar])

  return (
    <FormContainer>
      {company && (
        <Formik
          onSubmit={handleEdit}
          enableReinitialize
          validateOnChange
          initialValues={company ?? {
            name: '',
            address: {
              CEP: '',
              street: '',
              number: '',
              neighborhood: '',
              state: null,
              city: null,
              complement: ''
            },
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              {loading && <Loading />}

              <Grid container spacing={3} justifyContent='flex-end' >
                <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }} >
                  <Typography variant='h1' >
                    Empresa: {values.name}
                  </Typography>
                </Grid>

                <DriverFormCore formStatus={formStatus} />

                <DriverFormFooter
                  formStatus={formStatus}
                  changeFormStatus={setFormStatus}
                  isSubmitting={isSubmitting}
                  onSecondaryButtonClick={goBack}
                  buttonLabels={{
                    primary: 'Salvar',
                    secondary: 'Cancelar'
                  }}
                />
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </FormContainer>
  )
}

export default Detail