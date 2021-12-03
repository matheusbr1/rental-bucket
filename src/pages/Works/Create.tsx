import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useData } from 'hooks/useData'
import Moment from 'moment'
import { Actions } from 'store/actions'
import { Container, Grid, MenuItem, TextField, Typography, } from '@material-ui/core'
import { customers, drivers, equipments, trucks, workTypes } from 'mocks'
import Button from 'components/Button'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { useForm } from 'react-hook-form'

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const { register, handleSubmit } = useForm()

  const { dispatch  } = useData()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(async (fields) => {
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 3000))

      dispatch({ type: Actions.CREATE_WORK, payload: fields })

      enqueueSnackbar('Serviço criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao criar serviço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [goBack, enqueueSnackbar, dispatch])

  return (
    <>
      <AppBar search={false} />

      <Container maxWidth='md' style={{ marginTop: 100 }} >
        <form onSubmit={handleSubmit(handleCreate)} >
          <Grid container spacing={3} justify='flex-end' >
            <Grid item lg={12} md={12} sm={12} >
              <Typography variant='h1' >
                Novo serviço
              </Typography>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <TextField 
                select
                fullWidth
                label='Cliente'
                variant='outlined'
                {...register('client')}
              >
                {customers.map((customer, index) => (
                  <MenuItem key={index} value={customer.name} >{customer.name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item lg={4} md={4} sm={6} xs={12} >
              <TextField 
                select
                fullWidth
                label='Endereço'
                variant='outlined'
                {...register('address')}
              >
                {customers[0].address.map((address, index) => (
                  <MenuItem key={index} value={address.CEP}>
                    {address.street} - {address.number} - {address.neighborhood}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <TextField 
                select
                fullWidth
                label='Motorista'
                variant='outlined'
                {...register('driver')}
              >
              {drivers.map((driver, index) => (
                <MenuItem key={index} value={driver.name}> {driver.name} </MenuItem>
              ))}
              </TextField>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <TextField 
                select
                fullWidth
                label='Equipamento'
                variant='outlined'
                {...register('equipment')}
              >
              {equipments.map((equipment, index) => (
                <MenuItem key={index} value={equipment}> {equipment} </MenuItem>
              ))}
              </TextField>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <TextField 
                select
                fullWidth
                label='Caminhão'
                variant='outlined'
                {...register('truck')}
              >
              {trucks.map((truck, index) => (
                  <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <TextField 
                select
                fullWidth
                label='Serviço'
                variant='outlined'
                {...register('service')}
              >
                {workTypes.map((type, index) => (
                  <MenuItem key={index} value={type}> {type} </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <TextField 
                label='Quantidade'
                variant='outlined'
                type='number'
                fullWidth
                inputProps={{
                  min: 1,
                  max: 100
                }}
                {...register('quantity')}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ margin: 0 }}
                  autoOk
                  disableToolbar
                  fullWidth
                  placeholder="DD/MM/AAAA"
                  format="dd/MM/yyyy"
                  invalidDateMessage="Formato inválido"
                  inputVariant="outlined"
                  variant="inline"
                  color='primary'
                  views={ ['year', 'month', 'date'] }
                  margin="normal"
                  label='Data da retirada'
                  {...register('endDate')}
                  value={Moment(new Date()).add(7, 'days').toDate()}
                  onChange={register('endDate').onChange as any}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12} />

            <Grid item lg={4} md={4} sm={6} xs={12} >
              <Button loading={loading} color='primary' type='submit' >
                Criar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
}

export default Create