import React, { useEffect, useState, useCallback } from 'react'
import { years } from 'mocks'
import { Field, useFormikContext } from 'formik'
import { useSnackbar } from 'notistack'
import FormikTextField from 'components/FormikTextField'
import FormikAutoComplete from 'components/FormikAutoComplete'
import { IBrand, IModel, ITruck } from 'interfaces'
import { Grid } from '@material-ui/core'
import { api } from 'services/api'
import { getBrands } from 'fetchs/getBrands'
import { getModels } from 'fetchs/getModels'

const TruckFormCore: React.FC = () => {
  const { errors, touched, values, isSubmitting } = useFormikContext<ITruck>()

  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [brands, setBrands] = useState<IBrand[]>([])
  const [models, setModels] = useState<IModel[]>([])
  
  const [truckTypes, setTruckTypes] = useState([])

  const handleBrandBlur = useCallback(async (brand: IBrand | null) => {
    if (!!brand) {
      const models = await getModels(brand.id)
      setModels(models)
    }
  }, [])

  // Getting truck types
  useEffect(() => {
    api.get('/truck/types')
      .then(response => setTruckTypes(response.data))
  }, [])

  // Getting brands
  useEffect(() => {
    (async () => {
      try {
        const brands = await getBrands()
        setBrands(brands)
       } catch (error) {
        snackbar('Não foi possível obter as marcas!', { variant: 'error' })
       }
    })()
  }, [snackbar])

  return (
    <>
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

      <Grid item lg={2} md={2} sm={6} xs={12} >
        <FormikAutoComplete 
          name="manufacture_year"
          options={years}
          error={errors?.manufacture_year}
          touched={touched?.manufacture_year}
          label='Ano Fab'
        />
      </Grid>
    
      <Grid item lg={2} md={2} sm={6} xs={12} >
        <FormikAutoComplete 
          name="model_year"
          options={years}
          error={errors?.model_year}
          touched={touched?.model_year}
          label='Ano Modelo'
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikAutoComplete 
          name="truck_type"
          options={truckTypes}
          error={errors?.truck_type}
          touched={touched?.truck_type}
          getOptionLabel={(option: { name: string }) => option.name}
          label='Tipo'
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <Field component={FormikTextField} label='Renavan' name='renavam' />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} />
      
      <Grid item lg={4} md={4} sm={6} xs={12} />
    </>
  )
}

export { TruckFormCore }