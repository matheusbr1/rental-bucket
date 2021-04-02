import React, { useCallback, useState } from 'react'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'

import { Container, Content } from './styles'
import TextField from '../../../components/TextField'
import { useHistory } from 'react-router'
import { MenuItem } from '@material-ui/core'
import { adresses, clients, drivers, equipments, services, trucks } from '../../../mocks'
import DateInput from '../../../components/DateInput'

const Detail: React.FC = () => {

  const { goBack } = useHistory()

  const [isChanging, setIsChanging] = useState(false)

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const handleDelete = useCallback(() => {
    goBack()
  }, [goBack])

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  return (
    <Container>
      <AppBar search={false} />

      <Content>

        <h1>Serviço #1</h1>

        <form>
          <TextField 
            disabled={!isChanging}
            name='client' 
            label='Cliente'
            variant="outlined" 
            select
            defaultValue={clients[0].name}
          >
            {clients.map(client => (
              <MenuItem value={client.name} >{client.name}</MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            name='adress' 
            label='Endereço'
            variant="outlined" 
            select
            defaultValue={adresses[0].cep}
          >
            {adresses.map(adress => (
              <MenuItem value={adress.cep}>
                {adress.street} - {adress.number} - {adress.neighborhood}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            disabled={!isChanging}
            name='driver' 
            label='Motorista'
            variant="outlined" 
            select
            defaultValue={drivers[0].name}
          >
            {drivers.map(driver => (
              <MenuItem value={driver.name}> {driver.name} </MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            name='truck' 
            label='Caminhão'
            variant="outlined"
            select
            defaultValue={trucks[0].plate}
          >
           {trucks.map(truck => (
              <MenuItem value={truck.plate}> {truck.plate} </MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
            name='equipment' 
            label='Equipamento'
            variant="outlined"
            select 
            defaultValue={equipments[0]}
          >
            {equipments.map(equipment => (
              <MenuItem value={equipment}> {equipment} </MenuItem>
            ))}
          </TextField>

          <TextField 
            disabled={!isChanging}
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
            disabled={!isChanging}
            size='medium'
            name='quantity' 
            label='Quantidade'
            variant="outlined"
            type='number'
            defaultValue={2}
          />

          <DateInput 
            disabled={!isChanging}
            onChange={handleDateChange} 
            value={selectedDate} 
            label='Data da retirada'
          />

          <div className='floating-buttons'>
            {isChanging ? (
              <FloatingButton variant='confirm' onClick={handleChange} />
            ) : (
              <React.Fragment>
                <FloatingButton variant='edit' onClick={handleChange} />
                <FloatingButton variant='delete' onClick={handleDelete} />
              </React.Fragment>
            )}
          </div>
        </form>
      </Content>

      <div className='floating-buttons left'>
        <FloatingButton variant='return' onClick={goBack} />
      </div>
    </Container>
  )
}

export default Detail