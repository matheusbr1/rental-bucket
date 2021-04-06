import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'
import { MenuItem } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import TextField from '../../../components/TextField'

import { Container, Content } from './styles'

const Create: React.FC = () => {

  const { goBack } = useHistory()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleCreate = useCallback(() => {

    setLoading(true)

    setTimeout(() => {
      goBack()

      enqueueSnackbar('Cliente criado com sucesso!', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [goBack, enqueueSnackbar])

  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Container>
      <AppBar search={false} />
      
      <Content>

        <h1>Novo Cliente</h1>

        <form>

          <div className="grid">
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel value="fisic" control={<Radio />} label="Pessoa Física" />
              <FormControlLabel value="legal" control={<Radio />} label="Pessoa Jurídica" />
            </RadioGroup>
            
            <TextField 
              name='' 
              label='CPF'
              variant="outlined" 
            />
            
            <TextField 
              name='' 
              label='CNPJ'
              variant="outlined" 
            />

            <TextField
              name='' 
              label='Nome'
              variant="outlined" 
            />

            <TextField
              name='' 
              label='Razão Social'
              variant="outlined" 
            />

            <TextField
              name='' 
              label='Nome Fantasia'
              variant="outlined" 
            />
          </div>

          <div className="grid">
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel value="fisic" control={<Radio />} label="Endereço via CEP" />
              <FormControlLabel value="legal" control={<Radio />} label="Endereço digitado" />
            </RadioGroup>

            <TextField 
              name=''
              label='CEP'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Número'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Complemento'
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
              label='Número'
              variant="outlined" 
            />

            <TextField 
              name=''
              label='Complemento'
              variant="outlined" 
            />
          </div>
          
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
            <FloatingButton variant='confirm' onClick={handleCreate} loading={loading} />
          </div>
        </form>
      </Content>
      
    </Container>
  )
}

export default Create