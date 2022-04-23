import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Container, Grid, Typography, } from '@material-ui/core'
import { truckEquipments, years } from 'mocks'
import { IBrand, IModel } from 'interfaces'
import { getBrands } from 'fetchs/getBrands'
import { getModels } from 'fetchs/getModels'
import Button from 'components/Button'
import { createTruck } from 'redux/truck/truck.actions'
import { Formik, Form, Field } from 'formik'
import FormikTextField from 'components/FormikTextField'
import FormikAutoComplete from 'components/FormikAutoComplete'
import Loading from 'components/Loading'
import { api } from 'services/api'

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  
  const [brands, setBrands] = useState<IBrand[]>([])
  const [models, setModels] = useState<IModel[]>([])

  // Getting brands
  useEffect(() => {
    (async () => {
      try {
        const brands = await getBrands()
        setBrands(brands)
       } catch (error) {
        enqueueSnackbar('Não foi possível obter as marcas!', {
          variant: 'error'
        })
       }
    })()
  }, [enqueueSnackbar])

  const handleCreate = useCallback(async (fields) => {
    try {
      setLoading(true)

      await api.post('trucks', {
        ...fields,
        brandId: fields.brand?.id,
        modelId: fields.model?.id,
        typeId: 1,
        plate: fields.plate, 
        renavam: fields.renavam, 
        year: fields.year
      })

      dispatch(createTruck(fields))

      enqueueSnackbar('Caminhão cadastrado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao criar caminhão, tente novamente!!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [goBack, enqueueSnackbar, dispatch])

  const handleBrandBlur = useCallback(async (brand: IBrand | null) => {
    if (!!brand) {
      const models = await getModels(brand.id)
      setModels(models)
    }
  }, [])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar search={false} />

      <Formik
        onSubmit={handleCreate}
        enableReinitialize
        validateOnChange
        initialValues={{
          brand: null,
          model: null,
          equipment: '',
          year: {
            manufacture: '',
            model: ''
          },
        }}
      >
        {({ errors, touched, values, isSubmitting }) => (
          <Form>
            {loading && <Loading />}

            <Grid container spacing={3} justify='flex-end' >
              <Grid item lg={12} md={12} sm={12} style={{ width: '100%' }}>
                <Typography variant='h1' >
                  Novo Caminhão
                </Typography>
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} >
                <FormikAutoComplete 
                  name="brand"
                  options={brands}
                  error={errors.brand}
                  touched={touched.brand}
                  label='Marca'
                  getOptionLabel={(option: IBrand) => option.name}
                  onBlur={() => handleBrandBlur(values.brand)}
                />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} >
                <FormikAutoComplete 
                  name="model"
                  options={models}
                  error={errors.model}
                  disabled={!values.brand || isSubmitting}
                  touched={touched.model}
                  label='Modelo'
                  getOptionLabel={(option: IModel) => option.name}
                />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} >
                <Field component={FormikTextField} label='Placa' name='plate' />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} >
                <FormikAutoComplete 
                  name="year.manufacture"
                  options={years}
                  error={errors.year?.manufacture}
                  touched={touched.year?.manufacture}
                  label='Ano de Fabricação'
                />
              </Grid>
            
              <Grid item lg={4} md={4} sm={6} xs={12} >
                <FormikAutoComplete 
                  name="year.model"
                  options={years}
                  error={errors.year?.model}
                  touched={touched.year?.model}
                  label='Ano do Modelo'
                />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} >
                <FormikAutoComplete 
                  name="equipment"
                  options={truckEquipments}
                  error={errors.equipment}
                  touched={touched.equipment}
                  label='Equipamento'
                />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} >
                <Field component={FormikTextField} label='Renavan' name='renavam' />
              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={12} />
              
              <Grid item lg={4} md={4} sm={6} xs={12} />

              <Grid item lg={4} md={4} sm={6} xs={12} >
                <Button loading={loading} color='primary' type='submit' >
                  Criar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Create