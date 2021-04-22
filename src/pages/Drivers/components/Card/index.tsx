import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { useHistory } from 'react-router'
import DateInput from 'components/DateInput'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { drivers } from 'mocks'

import { Container, Divider } from './styles'
import { FormHandles } from '@unform/core'

interface CardProps {
  type: 'create' | 'update'
  onFormSubmit(fields: any): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onFormSubmit, onDelete = () => {} }) => {
  
  const formRef = useRef<FormHandles>(null)

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

      <Form ref={formRef} onSubmit={onFormSubmit} >
        <div className="grid">
          <TextField
            name='name' 
            label='Nome'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].name : null}
          />

          <TextField 
            name='CPF' 
            label='CPF'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].cpf : null}
          />

          <TextField 
            name='RG' 
            label='RG'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].rg : null}
          />

          <TextField 
            name='CNH' 
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
            name='CEP'
            label='CEP'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.cep : null}
          />

          <TextField 
            name='street'
            label='Logradouro'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.street : null}
          />

          <TextField 
            name='number'
            label='Número'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.number : null}
          />

          <TextField
            name='state' 
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
            name='city' 
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
            name='district'
            label='Bairro'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].adress.neighborhood : null}
          />

          <TextField 
            name='complement'
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
            name='email'
            label='Email'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].contact.email : null}
          />

          <TextField 
            name='telephone'
            label='Telefone'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? drivers[0].contact.telephone : null}
          />

          <TextField 
            name='cellphone'
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
              <FloatingButton variant='confirm' type='submit' loading={loading} />
            ) : isChanging ? (
                <FloatingButton variant='confirm' type='submit' loading={loading} />
              ) : (
                <div className='group' >
                  <FloatingButton variant='edit' onClick={handleChange} />
                  <FloatingButton variant='delete' onClick={onDelete} loading={loading} />
                </div>
              )
          }
        </div>
      </Form>

    </Container>
  )
}

export default Card