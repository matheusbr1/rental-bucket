import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'
import { MenuItem } from '@material-ui/core'

import TextField from '../../../components/TextField'
import DateInput from '../../../components/DateInput'

import { clients, adresses, drivers, trucks, equipments, services } from '../../../mocks'

import { Container, Content } from './styles'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const handleCreate = useCallback(() => {
    goBack()
  }, [goBack])

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
            {clients.map(client => (
              <MenuItem value={client.name} >{client.name}</MenuItem>
            ))}
          </TextField>

          <TextField 
            name='adress' 
            label='Endereço'
            variant="outlined" 
            select
          >
            {adresses.map(adress => (
              <MenuItem value={adress.cep}>
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
            {drivers.map(driver => (
              <MenuItem value={driver.name}> {driver.name} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='equipment' 
            label='Equipamento'
            variant="outlined"
            select 
          >
            {equipments.map(equipment => (
              <MenuItem value={equipment}> {equipment} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='truck' 
            label='Caminhão'
            variant="outlined"
            select
          >
           {trucks.map(truck => (
              <MenuItem value={truck.plate}> {truck.plate} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='service' 
            label='Serviço'
            variant="outlined"
            select 
          >
            {services.map(service => (
              <MenuItem value={service}> {service} </MenuItem>
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
            <FloatingButton variant='confirm' onClick={handleCreate} />
          </div>
        </form>
      </Content>
      
    </Container>
  )
}

export default Create