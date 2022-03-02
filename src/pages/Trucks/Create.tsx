/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Container, Grid, MenuItem, TextField, Typography, } from '@material-ui/core'
import { truckEquipments, years } from 'mocks'
import { IBrand, IModel, ITruck } from 'interfaces'
import { getBrands } from 'fetchs/getBrands'
import { getModels } from 'fetchs/getModels'
import Button from 'components/Button'
import { createTruck } from 'redux/actions/actionCreators'

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const [truck, setTruck] = useState<ITruck>({} as ITruck)
  
  const [brands, setBrands] = useState<IBrand[]>([])
  
  const [models, setModels] = useState<IModel[]>([])

  // Getting brands
  useEffect(() => {
    (async () => {
      try {
        const brands = await getBrands()
        setBrands(brands)
       } catch (error) {
        // Show a toast
       }
    })()
  }, [])

  // Getting models
  useEffect(() => {
    (async () => {
      try {
        const models = await getModels(truck.brand.id)
        setModels(models)
      } catch (error) {
        // Show a toast
      }
    })()
  }, [truck.brand])

  const handleCreate = useCallback((fields) => {
    dispatch(createTruck(fields))

    setLoading(true)

    setTimeout(() => {
      goBack()

      enqueueSnackbar('Caminhão cadastrado com sucesso!', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [goBack, enqueueSnackbar, dispatch])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar search={false} />

      <Grid container spacing={3} justify='flex-end' >
        <Grid item lg={12} md={12} sm={12} >
          <Typography variant='h1' >
            Novo Caminhão
          </Typography>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} >
          <TextField 
            select
            fullWidth
            label='Marcas'
            variant='outlined'
          >
            {brands.map((customer, index) => (
              <MenuItem key={index} value={customer.name} >{customer.name}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} >
          <TextField
            select
            fullWidth
            name='model'
            label='Modelo'
            variant="outlined" 
          >
            {models.map((model: any) => (
              <MenuItem  value={model} key={model.id}>  {model.name} </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} >
          <TextField
            fullWidth
            name='Placa' 
            label='Placa'
            variant="outlined" 
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} >
          <TextField
            select
            fullWidth
            name='manufacture'
            label='Ano de Fabricação'
            variant="outlined" 
          >
            {years.map(year => (
              <MenuItem  value={year} key={year}>  {year} </MenuItem>
            ))}
          </TextField>
        </Grid>
      
        <Grid item lg={4} md={4} sm={6} xs={12} >
          <TextField
            select
            fullWidth
            name='model'
            label='Ano do Modelo'
            variant="outlined" 
          >
            {years.map(year => (
              <MenuItem  value={year} key={year}>  {year} </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} >
          <TextField
            select
            fullWidth
            name='equipment'
            label='Equipamento'
            variant="outlined" 
          >
            {truckEquipments.map(equipment => (
              <MenuItem  value={equipment} key={equipment}>  {equipment} </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} >
          <TextField
            fullWidth
            name='renavam' 
            label='Renavan'
            variant="outlined" 
          />
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12} />
        
        <Grid item lg={4} md={4} sm={6} xs={12} />

        <Grid item lg={4} md={4} sm={6} xs={12} >
          <Button loading={loading} color='primary' type='submit' >
            Criar
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Create