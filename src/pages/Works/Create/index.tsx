import React, { useCallback } from 'react'
import { useHistory } from 'react-router'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'
import { MenuItem } from '@material-ui/core'

import TextField from '../../../components/TextField'
import DateInput from '../../../components/DateInput'

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
            <MenuItem value={1} >Empresa X</MenuItem>
            <MenuItem value={2} >José Santos</MenuItem>
            <MenuItem value={3} >Maria Conceição</MenuItem>
          </TextField>

          <TextField 
            name='adress' 
            label='Endereço'
            variant="outlined" 
            select
          >
            <MenuItem value={1} >Rua Rio da Galera, 10 - Vila Carmosina</MenuItem>
            <MenuItem value={2} >Praça Olinda Maria de Moura, 198 - Jardim Vista Linda</MenuItem>
            <MenuItem value={3} >Rua Miguel de Araújo Ribeiro, 109 - Jaraguá</MenuItem>
          </TextField>

          <TextField
            name='driver' 
            label='Motorista'
            variant="outlined" 
            select
          >
            <MenuItem value={1} >Ian Roberto Nathan Brito</MenuItem>
            <MenuItem value={2} >André Carlos Renato Castro</MenuItem>
            <MenuItem value={3} >Vinicius Murilo Breno Moreira</MenuItem>
            <MenuItem value={4} >Antonio Calebe Leonardo Assis</MenuItem>
            <MenuItem value={5} >Luís Kaique Tomás Porto</MenuItem>
          </TextField>

          <TextField 
            name='truck' 
            label='Caminhão'
            variant="outlined"
            select
          >
            <MenuItem value={1} >CHA-0564</MenuItem>
            <MenuItem value={2} >FPS-0060</MenuItem>
            <MenuItem value={3} >EWK-3943</MenuItem>
            <MenuItem value={4} >COI-8604</MenuItem>
          </TextField>

          <TextField 
            name='equipment' 
            label='Equipamento'
            variant="outlined"
            select 
          >
            <MenuItem value={1} >Sacos de lixo</MenuItem>
            <MenuItem value={2} >Container de lixo</MenuItem>
            <MenuItem value={3} >Caçamba 5m³</MenuItem>
            <MenuItem value={4} >Caçamba 7m³</MenuItem>
            <MenuItem value={5} >Caçamba 12m³</MenuItem>
            <MenuItem value={6} >Caçamba 16m³</MenuItem>
          </TextField>

          <TextField 
            name='service' 
            label='Serviço'
            variant="outlined"
            select 
          >
            <MenuItem value={1} >Troca</MenuItem>
            <MenuItem value={2} >Retirada</MenuItem>
            <MenuItem value={3} >Coloca</MenuItem>
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