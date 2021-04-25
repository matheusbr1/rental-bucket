import { MenuItem } from '@material-ui/core'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Scope } from '@unform/core'
import { useHistory } from 'react-router-dom'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { brands, models, truckEquipments, trucks, years } from 'mocks'
import * as yup from 'yup'

import { Container } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'

interface Truck {
  brand: string
  model: string
  plate: string
  equipment: string
  renavam: string
  year: {
    manufacture: string
    model: string
  }
}

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: Truck): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {
  const formRef = useRef<FormHandles>(null)

  const { goBack } = useHistory()

  const [truck, setTruck] = useState({
    brand: '',
    model: '',
    plate: '',
    equipment: '',
    renavam: '',
    year: {
      manufacture: '',
      model: '',
    },
  } as Truck)

  const handleChangeTruck = useCallback((path: string, value) => {
    setTruck(oldState => ({
      ...oldState,
      [path]: value
    }))
  }, [])

  const handleYears = useCallback((path: string, value) => {
    setTruck(oldState => ({
      ...oldState,
      year: {
        ...oldState.year,
        [path]: value
      }
    }))
  }, [])

  useEffect(() => {
    if (type === 'update') {
      setTruck(trucks[0])
    }
  }, [type])

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

  const handleFormSubmit = useCallback(async () => {

    console.log(truck)

    try {
      formRef.current?.setErrors({})

      const schema = yup.object().shape({
        brand: yup.string().required('Campo obrigatório'),
        model: yup.string().required('Campo obrigatório'),
        plate: yup.string().required('Campo obrigatório'),
        equipment: yup.string().required('Campo obrigatório'),
        renavam: yup.string().required('Campo obrigatório'),
        year: yup.object({
          manufacture: yup.string().required('Campo obrigatório'),
          model: yup.string().required('Campo obrigatório'),
        })
      })

      await schema.validate(truck, {
        abortEarly: false
      })

      onConfirm(truck)

    } catch (error) {
      if(error instanceof yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
        console.log(errors)
      }
    }
  }, [truck, onConfirm])

  return (
    <Container>
      { 
        type === 'create' 
          ? <h1>Novo Caminhão</h1> 
          : <h1>{truck.plate}</h1> 
      }

      <Form ref={formRef} onSubmit={handleFormSubmit} >

        <div className="grid">
          <TextField
            select
            name='brand'
            label='Marca'
            variant="outlined" 
            disabled={disabled}
            value={truck.brand}
            onChange={e => handleChangeTruck('brand', e.target.value)}
          >
            {brands.map(brand => (
              <MenuItem value={brand} key={brand} > {brand} </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name='model'
            label='Modelo'
            variant="outlined" 
            disabled={disabled}
            value={truck.model}
            onChange={e => handleChangeTruck('model', e.target.value)}
          >
            {models.map(model => (
              <MenuItem  value={model} key={model}>  {model} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='plate' 
            label='Placa'
            variant="outlined" 
            disabled={disabled}
            value={truck.plate}
            onChange={e => handleChangeTruck('plate', e.target.value)}
          />

          <Scope path='year' >
            <TextField
              select
              name='manufacture'
              label='Ano de Fabricação'
              variant="outlined" 
              disabled={disabled}
              value={truck.year.manufacture}
              onChange={e => handleYears('manufacture', e.target.value)}
            >
              {years.map(year => (
                <MenuItem  value={year} key={year}>  {year} </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              name='model'
              label='Ano do Modelo'
              variant="outlined" 
              disabled={disabled}
              value={truck.year.model}
              onChange={e => handleYears('model', e.target.value)}
            >
              {years.map(year => (
                <MenuItem  value={year} key={year}>  {year} </MenuItem>
              ))}
            </TextField>
          </Scope>

          <TextField
            select
            name='equipment'
            label='Equipamento'
            variant="outlined" 
            disabled={disabled}
            value={truck.equipment}
            onChange={e => handleChangeTruck('equipment', e.target.value)}
          >
           {truckEquipments.map(equipment => (
              <MenuItem  value={equipment} key={equipment}>  {equipment} </MenuItem>
            ))}
          </TextField>

          <TextField 
            name='renavam' 
            label='Renavan'
            variant="outlined" 
            disabled={disabled}
            value={truck.renavam}
            onChange={e => handleChangeTruck('renavam', e.target.value)}
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