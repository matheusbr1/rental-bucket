import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'
import { MenuItem } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import DateInput from '../../../components/DateInput'

import TextField from '../../../components/TextField'

import { Container, Content, Divider } from './styles'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const [birthday, setBirthday] = React.useState<Date | null>(null)

  const handleBirhday = (date: Date | null) => {
    setBirthday(date)
  }

  const handleCreate = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      goBack()

      enqueueSnackbar('Motorista criado com sucesso!', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [goBack, enqueueSnackbar])

  return (
    <Container>
      <AppBar search={false} />
      
      <Content>

        <h1>Novo Motorista</h1>

        <form>

          <div className="grid">
            <TextField
              name='' 
              label='Nome'
              variant="outlined" 
            />

             <TextField 
              name='' 
              label='CPF'
              variant="outlined" 
            />

            <TextField 
              name='' 
              label='RG'
              variant="outlined" 
            />

            <TextField 
              name='' 
              label='CNH'
              variant="outlined" 
            />

            <DateInput 
              label='Data de nascimento'
              onChange={handleBirhday}
              value={birthday}
            />
          </div>

          <Divider />

          <h2>Endereço</h2>

          <div className="grid">
            <TextField 
              name=''
              label='CEP'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Logradouro'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Número'
              variant="outlined" 
            />

            <TextField
              name='' 
              label='Estado'
              variant="outlined" 
              select
            >
              <MenuItem value='SP'> SP </MenuItem>
              <MenuItem value='RJ'> RJ </MenuItem>
              <MenuItem value='MG'> MG </MenuItem>
            </TextField>

            <TextField
              name='' 
              label='Cidade'
              variant="outlined" 
              select
            >
              <MenuItem value='Osasco'> Osasco </MenuItem>
              <MenuItem value='Carapicuíba'> Carapicuíba </MenuItem>
              <MenuItem value='Vinhedo'> Vinhedo </MenuItem>
            </TextField>
            
            <TextField 
              name=''
              label='Bairro'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Complemento'
              variant="outlined" 
            />
          </div>

          <Divider />

          <h2>Contato</h2>
          
          <div className="grid">

            <TextField
              name=''
              label='Email'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Telefone'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Celular'
              variant="outlined" 
            />
          </div>

          <div className='floating-buttons'>
            <FloatingButton variant='return' onClick={goBack} />
            <FloatingButton variant='confirm' onClick={handleCreate} loading={loading} />
          </div>
        </form>
      </Content>
      
    </Container>
  )
}

export default Create