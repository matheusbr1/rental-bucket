import { MenuItem } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar from '../../components/AppBar'
import DateInput from '../../components/DateInput'
import FloatingButton from '../../components/FloatingButton'
import TextField from '../../components/TextField'
import { clients, drivers, equipments, services, trucks } from '../../mocks'

import { Container, Content } from './styles'

const Reports: React.FC = () => {

  const { goBack } = useHistory()

  const handleNewReport = useCallback(() => {
    goBack()
  }, [goBack])


  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const [fields]: any = useState({
    clients: (
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
    ),
    drivers: (
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
    ),
    equipments: (
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
    ),
    trucks: (
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
    ),
    services: (
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
    )
  })

  const [type, setType] = useState('')

  const handleFieldSelected = useCallback((e) => {
    setType(e.target.value)
  } ,[])

  return (
    <Container>
      <AppBar search={false} />

      <Content>

        <h1>Relatórios</h1>

        <form>
          <TextField 
            name='type' 
            label='Filtrar por'
            variant="outlined" 
            onChange={handleFieldSelected}
            select
          >
            <MenuItem value='clients' >Clientes</MenuItem>
            <MenuItem value='trucks' >Caminhões</MenuItem>
            <MenuItem value='equipments' >Equipamentos</MenuItem>
            <MenuItem value='drivers' >Motoristas</MenuItem>
          </TextField>


          <DateInput 
            onChange={handleDateChange} 
            value={selectedDate} 
            label='Data inicial'
          />

          <DateInput 
            onChange={handleDateChange} 
            value={selectedDate} 
            label='Data final'
          />

          {fields[type]}

           <div className='floating-buttons'>
            <FloatingButton variant='confirm' onClick={handleNewReport} />
          </div>
        </form>
      </Content>
      
      <div className='floating-buttons left'>
        <FloatingButton variant='return' onClick={goBack} />
      </div>
    </Container>
  )
}

export default Reports