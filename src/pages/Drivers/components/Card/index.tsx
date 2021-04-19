import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import DateInput from '../../../../components/DateInput'
import FloatingButton from '../../../../components/FloatingButton'
import TextField from '../../../../components/TextField'
import { drivers } from '../../../../mocks'

import { Container, Divider } from './styles'

interface CardProps {
  type: 'create' | 'update'
  onConfirm(): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {
  
  const { goBack } = useHistory()

  const [birthday, setBirthday] = React.useState<Date | null>(null)

  const handleBirhday = (date: Date | null) => {
    setBirthday(date)
  }

  const [isChanging, setIsChanging] = useState(false)

  const handleChange = useCallback(() => {
    setIsChanging(state => !state)
  }, [])

  const disabled = useMemo(() => type === 'update' && !isChanging, [type, isChanging])

  useEffect(() => {
    if (!loading) {
      setIsChanging(false)
    }
  }, [loading])

  return (
    <Container>
      
      { 
        type === 'create' 
          ? <h1>Novo Motorista</h1> 
          : <h1>{drivers[0].name}</h1> 
      }

      <form>
        <div className="grid">
          <TextField
            name='' 
            label='Nome'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].name : null}
          />

          <TextField 
            name='' 
            label='CPF'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].cpf : null}
          />

          <TextField 
            name='' 
            label='RG'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].rg : null}
          />

          <TextField 
            name='' 
            label='CNH'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? '123123123' : null}
          />

          <DateInput 
            label='Data de nascimento'
            onChange={handleBirhday}
            value={birthday}
            disabled={disabled}
          />
        </div>

        <Divider />

        <h2>Endereço</h2>

        <div className="grid">
          <TextField 
            name=''
            label='CEP'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.cep : null}
          />

          <TextField 
            name=''
            label='Logradouro'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.street : null}
          />

          <TextField 
            name=''
            label='Número'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.number : null}
          />

          <TextField
            name='' 
            label='Estado'
            variant="outlined" 
            select
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.state : null}
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
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.city : null}
          >
            <MenuItem value='Osasco'> Osasco </MenuItem>
            <MenuItem value='Carapicuíba'> Carapicuíba </MenuItem>
            <MenuItem value='Vinhedo'> Vinhedo </MenuItem>
          </TextField>
          
          <TextField 
            name=''
            label='Bairro'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.neighborhood : null}
          />

          <TextField 
            name=''
            label='Complemento'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.complement : null}
          />
        </div>

        <Divider />

        <h2>Contato</h2>

        <div className="grid">

          <TextField
            name=''
            label='Email'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].contact.email : null}
          />

          <TextField 
            name=''
            label='Telefone'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].contact.telephone : null}
          />

          <TextField 
            name=''
            label='Celular'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].contact.cellphone : null}
          />
        </div>

        <div className='floating-buttons'>
          <FloatingButton variant='return' onClick={goBack} />

          {
            type === 'create' ? (
              <FloatingButton variant='confirm' onClick={onConfirm} loading={loading} />
            ) : isChanging ? (
                <FloatingButton variant='confirm' onClick={onConfirm} loading={loading} />
              ) : (
                <div className='group' >
                  <FloatingButton variant='edit' onClick={handleChange} />
                  <FloatingButton variant='delete' onClick={onDelete} loading={loading} />
                </div>
              )
          }
        </div>
      </form>

    </Container>
  )
}

export default Card