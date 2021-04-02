import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'
import { MenuItem } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import TextField from '../../../components/TextField'
import DateInput from '../../../components/DateInput'

import { clients, adresses, drivers, trucks, equipments, services } from '../../../mocks'

import { Container, Content } from './styles'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      goBack()

      enqueueSnackbar('Serviço criado com sucesso!', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [goBack, enqueueSnackbar])

  return (
    <Container>
      <AppBar search={false} />
      
      <Content>

        <h1>Novo Serviço</h1>

        <form>
          <TextField 
            name='client' 
            label='Cliente'
            variant="outlined" 
            
            helperText="Campo obrigatório"
            error

            select
          >
            {clients.map((client, index) => (
              <MenuItem key={index} value={client.name} >{client.name}</MenuItem>
            ))}
          </TextField>

          <TextField 
            name='adress' 
            label='Endereço'
            variant="outlined" 
            select
          >
            {adresses.map((adress, index) => (
              <MenuItem key={index} value={adress.cep}>
                {adress.street} - {adress.number} - {adress.neighborhood}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name='driver' 
            label='Motorista'
            variant="outlined" 
            select
          >
            {drivers.map((driver, index) => (
              <MenuItem key={index} value={driver.name}> {driver.name} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='equipment' 
            label='Equipamento'
            variant="outlined"
            select 
          >
            {equipments.map((equipment, index) => (
              <MenuItem key={index} value={equipment}> {equipment} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='truck' 
            label='Caminhão'
            variant="outlined"
            select
          >
           {trucks.map((truck, index) => (
              <MenuItem key={index} value={truck.plate}> {truck.plate} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='service' 
            label='Serviço'
            variant="outlined"
            select 
          >
            {services.map((service, index) => (
              <MenuItem key={index} value={service}> {service} </MenuItem>
            ))}
          </TextField>

          <TextField 
            size='medium'
            name='quantity' 
            label='Quantidade'
            variant="outlined"
            type='number'
          />

          <DateInput 
            onChange={handleDateChange} 
            value={selectedDate} 
            label='Data da retirada'
          />

           <div className='floating-buttons'>
            <FloatingButton variant='confirm' onClick={handleCreate} loading={loading} />
          </div>
        </form>
      </Content>
      
    </Container>
  )
}

export default Create