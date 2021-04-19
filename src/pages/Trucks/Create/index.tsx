import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from '../../../components/AppBar'
import FloatingButton from '../../../components/FloatingButton'
import { MenuItem } from '@material-ui/core'
import { useSnackbar } from 'notistack'

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

      enqueueSnackbar('Caminhão cadastrado com sucesso!', {
        variant: 'success'
      })

      setLoading(false)
    }, 2000)
  }, [goBack, enqueueSnackbar])

  return (
    <Container>
      <AppBar search={false} />
      
      <Content>

        <h1>Novo Caminhão</h1>

        <form>

          <div className="grid">
            <TextField
              name=''
              label='Marca'
              variant="outlined" 

              select
            >
              <MenuItem value='Ford' > Ford </MenuItem>
              <MenuItem value='Mercedes' > Mercedes </MenuItem>
              <MenuItem value='volkswagen' > volkswagen </MenuItem>
            </TextField>

            <TextField
              name=''
              label='Modelo'
              variant="outlined" 

              select
            >
              <MenuItem value='Modelo 1' > Modelo 1 </MenuItem>
              <MenuItem value='Modelo 2' > Modelo 2 </MenuItem>
              <MenuItem value='Outro' > Outro </MenuItem>
            </TextField>

            <TextField 
              name='' 
              label='Placa'
              variant="outlined" 
            />

            <TextField
              name=''
              label='Ano de Fabricação'
              variant="outlined" 

              select
            >
              <MenuItem value={1999} > 1999 </MenuItem>
              <MenuItem value={2000} > 2000 </MenuItem>
              <MenuItem value={2001} > 2001 </MenuItem>
            </TextField>

            <TextField
              name=''
              label='Ano do Modelo'
              variant="outlined" 

              select
            >
              <MenuItem value={1999} > 1999 </MenuItem>
              <MenuItem value={2000} > 2000 </MenuItem>
              <MenuItem value={2001} > 2001 </MenuItem>
            </TextField>

            <TextField
              name=''
              label='Equipamento'
              variant="outlined" 

              select
            >
              <MenuItem value='Poliguindaste' > Poliguindaste </MenuItem>
              <MenuItem value='Coletor' > Coletor </MenuItem>
              <MenuItem value='Basculante' > Basculante </MenuItem>
              <MenuItem value='Rollon' > Rollon </MenuItem>
            </TextField>

            <TextField 
              name='' 
              label='Renavan'
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