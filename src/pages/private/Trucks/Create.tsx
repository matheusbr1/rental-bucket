import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Grid, Typography, } from '@material-ui/core'
import { createTruck } from 'store/truck/truck.actions'
import { Formik, Form } from 'formik'
import Loading from 'components/Loading'
import usePrivateApi from 'hooks/usePrivateApi'
import { trucksSchema } from 'validations/trucksSchema'
import { TruckFormCore } from './FormCore'
import { FormContainer } from 'components/layout/FormContainer'
import { TruckFormFooter } from './FormFooter'

const Create: React.FC = () => {
  const api = usePrivateApi()

  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  
  const handleCreate = useCallback(async (fields) => {
    try {
      setLoading(true)

      const { data: truck } = await api.post('trucks', {
        plate: fields.plate,
        renavam: fields.renavam, 
        manufacture_year: fields.manufacture_year,
        model_year: fields.model_year,
        brand_id: fields.brand?.id,
        model_id: fields.model?.id,
        truck_type_id: fields.type.id,
      })

      dispatch(createTruck({
        id: truck.id,
        ...fields
      }))

      snackbar('Caminhão cadastrado com sucesso!', { variant: 'success' })

      goBack()
    } catch (error) {
      snackbar('Erro ao criar caminhão, tente novamente!!', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }, [api, dispatch, snackbar, goBack])

  return (
    <FormContainer>
      <Formik
        onSubmit={handleCreate}
        enableReinitialize
        validateOnChange
        validationSchema={trucksSchema}
        initialValues={{
          brand: null,
          model: null,
          renavam: '',
          plate: '',
          type: null,
          manufacture_year: '',
          model_year: '',
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {loading && <Loading />}

            <Grid container spacing={3} justifyContent='flex-end' >
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                <Typography variant='h1' >
                  Novo Caminhão
                </Typography>
              </Grid>

              <TruckFormCore />

              <TruckFormFooter
                formStatus='isFilling'
                isSubmitting={isSubmitting}
                onSecondaryButtonClick={goBack}
                buttonLabels={{
                  primary: 'Criar',
                  secondary: 'Cancelar'
                }}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default Create