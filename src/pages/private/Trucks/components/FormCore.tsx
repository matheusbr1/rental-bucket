import React, { useEffect, useState, useCallback } from 'react'
import { years } from '../mocks'
import { Field, useFormikContext } from 'formik'
import { useSnackbar } from 'notistack'
import FormikTextField from 'components/FormikTextField'
import FormikAutoComplete from 'components/FormikAutoComplete'
import { FormStatus, IBrand, IModel, ITruck } from 'interfaces'
import { Grid } from '@material-ui/core'
import usePrivateApi from 'hooks/usePrivateApi'
import { getBrands } from 'fetchs/getBrands'
import { getModels } from 'fetchs/getModels'
import { useDispatch } from 'react-redux'
import { setTruckBrand, setTruckModel } from 'store/truck/truck.actions'

interface IFormCoreProps {
  formStatus?: FormStatus
}

const TruckFormCore: React.FC<IFormCoreProps> = ({ formStatus }) => {
  const api = usePrivateApi()

  const dispatch = useDispatch()

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
      .then(response => {
        setTruckTypes(response.data)
      })
  }, [api])

  // Getting brands
  useEffect(() => {
    (async () => {
      try {
        const brands = await getBrands()
        setBrands(brands)

        // updating truck brand
        const brand = brands.find(brand => brand.id === values.brand?.id) as IBrand
        dispatch(setTruckBrand(brand))

        const models = await getModels(brand.id)
        setModels(models)

        // updating truck model
        const model = models.find(model => model.id === values.model?.id) as IModel
        dispatch(setTruckModel(model))
      } catch (error) {
        snackbar('Não foi possível obter as marcas!', { variant: 'error' })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, snackbar])

  return (
    <>
      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikAutoComplete
          name="brand"
          options={brands}
          error={errors.brand}
          touched={touched.brand}
          disabled={formStatus === 'isViewing'}
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
          disabled={!values.brand || isSubmitting || formStatus === 'isViewing'}
          touched={touched.model}
          label='Modelo'
          getOptionLabel={(option: IModel) => option.name}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <Field
          component={FormikTextField}
          label='Placa'
          name='plate'
          mask='plate'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={2} md={2} sm={6} xs={12} >
        <FormikAutoComplete
          name="manufacture_year"
          options={years}
          error={errors?.manufacture_year}
          touched={touched?.manufacture_year}
          label='Ano Fab'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={2} md={2} sm={6} xs={12} >
        <FormikAutoComplete
          name="model_year"
          options={years}
          error={errors?.model_year}
          touched={touched?.model_year}
          label='Ano Modelo'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <FormikAutoComplete
          name="type"
          options={truckTypes}
          error={errors?.type}
          touched={touched?.type}
          getOptionLabel={(option: { name: string }) => option.name}
          label='Tipo'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} >
        <Field
          component={FormikTextField}
          label='Renavan'
          name='renavam'
          mask='renavam'
          disabled={formStatus === 'isViewing'}
        />
      </Grid>

      <Grid item lg={4} md={4} sm={6} xs={12} />

      <Grid item lg={4} md={4} sm={6} xs={12} />
    </>
  )
}

export { TruckFormCore }