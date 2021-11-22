import { MenuItem } from '@material-ui/core'
import { IBrand, IModel, ITruck } from 'interfaces'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Scope } from '@unform/core'
import { useHistory } from 'react-router-dom'
import FloatingButton from 'components/FloatingButton'
import TextField from 'components/TextField'
import { truckEquipments, trucks, years } from 'mocks'
import * as yup from 'yup'
import { Container } from './styles'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from 'utils/getValidationFormErrors'
import Title from 'components/Title'
import MaskedField from 'components/TextField/masked'
import { trucksSchema } from 'validations/trucksSchema'
import { getBrands } from 'fetchs/getBrands'
import { getModels } from 'fetchs/getModels'

interface CardProps {
  type: 'create' | 'update'
  onConfirm(fields: ITruck): void
  onDelete?(): void
  loading: boolean
}

const Card: React.FC<CardProps> = ({ type, loading, onConfirm, onDelete = () => {} }) => {
  const formRef = useRef<FormHandles>(null)

  const { goBack } = useHistory()

  const [truck, setTruck] = useState<ITruck>({} as ITruck)
  const [brands, setBrands] = useState<IBrand[]>([])
  const [models, setModels] = useState<IModel[]>([])
  
  // Getting brands
  useEffect(() => {
    (async () => {
      try {
        const brands = await getBrands()
        setBrands(brands)
       } catch (error) {
        // Show a toast
       }
    })()
  }, [])

  // Getting models
  useEffect(() => {
    (async () => {
      try {
        const models = await getModels(truck.brand.id)
        setModels(models)
      } catch (error) {
        // Show a toast
      }
    })()
  }, [truck.brand])

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
      setTruck(trucks[0] as any)
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

      await trucksSchema.validate(truck, {
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

      <Title 
        text={type === 'create'  ?  'Novo Caminhão' : truck.plate} 
        size='large'
      />

      <Form ref={formRef} onSubmit={handleFormSubmit} >

        <div className="grid">
          <TextField
            select
            name='brand'
            label='Marca'
            variant="outlined" 
            disabled={disabled}
            value={truck?.brand}
            onChange={e => handleChangeTruck('brand', e.target.value)}
          >
            {brands.map((brand: any) => (
              <MenuItem value={brand} key={brand.id} > {brand.name} </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name='model'
            label='Modelo'
            variant="outlined" 
            disabled={disabled || !models.length}
            value={truck.model}
            onChange={e => handleChangeTruck('model', e.target.value)}
          >
            {models.map((model: any) => (
              <MenuItem  value={model} key={model.id}>  {model.name} </MenuItem>
            ))}
          </TextField>
          
          <MaskedField 
            mask='plate'
            name='Placa' 
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
              value={truck?.year?.manufacture}
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
              value={truck?.year?.model}
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
            value={truck?.equipment}
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
            value={truck?.renavam}
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