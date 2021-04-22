import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { trucks } from 'mocks'

import { Container } from './styles'
import { Form } from '@unform/web'
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
          ? <h1>Novo Caminhão</h1> 
          : <h1>{trucks[0].plate}</h1> 
      }

      <Form ref={formRef} onSubmit={onFormSubmit} >

        <div className="grid">
          <TextField
            name='brand'
            label='Marca'
            variant="outlined" 
            select
            disabled={disabled}
            defaultValue={type === 'update' ? trucks[0].brand : null}
          >
            <MenuItem value='Ford' > Ford </MenuItem>
            <MenuItem value='Mercedes' > Mercedes </MenuItem>
            <MenuItem value='volkswagen' > volkswagen </MenuItem>
          </TextField>

          <TextField
            name='model'
            label='Modelo'
            variant="outlined" 
            select
            disabled={disabled}
            defaultValue={type === 'update' ? trucks[0].model : null}
          >
            <MenuItem 
              value='F-1000 XLT 4x4 Diesel Turbo' 
            > 
              F-1000 XLT 4x4 Diesel Turbo 
            </MenuItem>
            
            <MenuItem 
              value='Ranger XLT 3.0 PSE 163cv 4x4 CD TB Dies'
            > 
              Ranger XLT 3.0 PSE 163cv 4x4 CD TB Dies 
            </MenuItem>
          </TextField>

          <TextField 
            name='plate' 
            label='Placa'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? trucks[0].plate : null}
          />

          <TextField
            name='manufactureYear'
            label='Ano de Fabricação'
            variant="outlined" 
            select
            disabled={disabled}
            defaultValue={type === 'update' ? trucks[0].year.manufacture : null}
          >
            <MenuItem value={1996} > 1996 </MenuItem>
            <MenuItem value={1997} > 1997 </MenuItem>
            <MenuItem value={1998} > 1998 </MenuItem>
            <MenuItem value={1999} > 1999 </MenuItem>
            <MenuItem value={2000} > 2000 </MenuItem>
            <MenuItem value={2001} > 2001 </MenuItem>
          </TextField>

          <TextField
            name='modelYear'
            label='Ano do Modelo'
            variant="outlined" 
            select
            disabled={disabled}
            defaultValue={type === 'update' ? trucks[0].year.model : null}
          >
            <MenuItem value={1996} > 1996 </MenuItem>
            <MenuItem value={1997} > 1997 </MenuItem>
            <MenuItem value={1998} > 1998 </MenuItem>
            <MenuItem value={1999} > 1999 </MenuItem>
            <MenuItem value={2000} > 2000 </MenuItem>
            <MenuItem value={2001} > 2001 </MenuItem>
          </TextField>

          <TextField
            name='equipment'
            label='Equipamento'
            variant="outlined" 
            select
            disabled={disabled}
            defaultValue={type === 'update' ? trucks[0].equipament.name : null}
          >
            <MenuItem value='Poliguindaste' > Poliguindaste </MenuItem>
            <MenuItem value='Coletor' > Coletor </MenuItem>
            <MenuItem value='Basculante' > Basculante </MenuItem>
            <MenuItem value='Rollon' > Rollon </MenuItem>
          </TextField>

          <TextField 
            name='renavam' 
            label='Renavan'
            variant="outlined" 
            disabled={disabled}
            defaultValue={type === 'update' ? trucks[0].renavam : null}
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