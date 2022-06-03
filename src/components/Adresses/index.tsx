
import React, { useCallback, useEffect, useState } from 'react'
import { IAddress, ICity, IState } from 'interfaces';
import { Delete, Check  } from '@material-ui/icons'
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/AddCircle'
import { useSnackbar } from 'notistack'
import { Field, Form, Formik } from 'formik';
import FormikTextField from 'components/FormikTextField';
import { addressSchema } from 'validations/addressSchema';
import { getStates } from 'fetchs/getStates';
import Loading from 'components/Loading';
import axios from 'axios';
import { getCitys } from 'fetchs/getCitys';
import FormikAutoComplete from 'components/FormikAutoComplete';
import { 
  Avatar, 
  Box, 
  Grid,  
  IconButton,  
  List,  
  ListItem,  
  ListItemAvatar,  
  ListItemSecondaryAction,  
  ListItemText,  
  Typography,
  Fab,
} from '@material-ui/core'

interface AddressProps {
  logradouro: string 
  uf: string 
  localidade: string  
  bairro: string 
}

interface AdressesProps {
  adresses: IAddress[]
  setAdresses: (adresses: IAddress[]) => void
  disabled?: boolean
}

const Adresses: React.FC<AdressesProps> = ({ adresses, setAdresses, disabled = false }) => {
  const { enqueueSnackbar: snackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [states, setStates] = useState<IState[]>([])
  const [citys, setCitys] = useState<ICity[]>([])

  // Getting States
  useEffect(() => {
    (async () => {
      const states = await getStates()
      setStates(states)
    })()
  }, [])

  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleDelete = useCallback((CEP: string) => {
    setAdresses(adresses.filter(address => address.CEP !== CEP))
    
    snackbar('Endereço deletado com sucesso!', { variant: 'success' })
  }, [adresses, setAdresses, snackbar])

  const handleAddContact = useCallback((address: IAddress) => {
    setAdresses(adresses.concat([address]))
    
    setIsAddingAddress(false)

    snackbar('Endereço adicionado com sucesso!', { variant: 'success' })
  }, [adresses, setAdresses, snackbar])


  const handleGetAdress = useCallback(async (CEP: string): Promise<Partial<IAddress> | undefined> => {
    try {
      setLoading(true)

      let address = { CEP } as Partial<IAddress>
  
      const { data } = await axios.get(`https://viacep.com.br/ws/${CEP}/json`)

      if (data.erro) {
        throw new Error('Unable to fetch zip code')
      }
  
      if (!data) {
        return address
      }
  
      const { logradouro, uf, localidade, bairro }: AddressProps = data
          
      address = {
        neighborhood: bairro,
        street: logradouro,
        state: states.find(state => state.sigla === uf)
      }
  
      const citys = await getCitys(uf)
  
      setCitys(citys)
  
      address.city = citys.find(city => city.name === localidade)
  
      return address
    } catch {
      snackbar('Erro ao buscar endereço, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }
  }, [states, snackbar])

  return (
    <Formik
      onSubmit={(values, actions) => {
        handleAddContact(values)
        actions.resetForm()
      }}
      validationSchema={addressSchema}
      initialValues={{
        CEP: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        state: null,
        city: null
      }}
    >
      {({ values, errors, touched, setValues, submitForm, resetForm }) => (
        <Form style={{ width: '100%' }} >
          {loading && <Loading />}

          <Grid container spacing={3} >
            <Grid item lg={12} md={12} sm={12} xs={12} >
              <Box display='flex' alignItems='center'>
                <Box mr='10px' >
                  <Typography variant='h2' >
                    Endereços
                  </Typography>
                </Box>

                <IconButton edge="end" aria-label="add" disabled={disabled} >
                  <Add onClick={() => setIsAddingAddress(true)} />
                </IconButton>
              </Box>
            </Grid>
            
            {!!adresses.length && (
              <Grid item lg={12} md={12} sm={12} xs={12} >
                <List dense>
                  {adresses.map(({ CEP, street, number, state, city }) => (
                    <ListItem key={CEP + number} >
                      <ListItemAvatar>
                        <Avatar>
                          <HomeIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${street}, ${number}`}
                        secondary={`${CEP}, ${state?.sigla}, ${city?.name}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" disabled={disabled} >
                          <DeleteIcon onClick={() => handleDelete(CEP)} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
            
            {!adresses.length && !isAddingAddress && (
              <Grid item lg={12} md={12} sm={12} xs={12} >
                <Typography variant='h5' >
                  Adicione um endereço!
                </Typography>
              </Grid>
            )}

            {isAddingAddress && (
              <React.Fragment>
                <Grid item lg={2} md={2} sm={4} xs={12} >
                  <Field 
                    component={FormikTextField} 
                    label='CEP' 
                    name='CEP'
                    onBlur={async () => {
                      const address = await handleGetAdress(values.CEP)
                      setValues({ ...values, ...address } as any)
                    }}
                  />
                </Grid>

                <Grid item lg={10} md={10} sm={8} xs={12} >
                  <Field component={FormikTextField} label='Logradouro' name='street' />
                </Grid>

                <Grid item lg={2} md={2} sm={4} xs={12} >
                  <Field 
                    component={FormikTextField} 
                    label='Número' 
                    name='number'
                    type='number'
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                <Grid item lg={10} md={10} sm={8} xs={12} >
                  <Field component={FormikTextField} label='Bairro' name='neighborhood' />
                </Grid>

                <Grid item lg={2} md={2} sm={4} xs={12} >
                  <FormikAutoComplete 
                    name="state"
                    options={states}
                    error={errors?.state}
                    touched={touched?.state}
                    label='UF'
                    getOptionLabel={(option: IState) => option.sigla}
                  />
                </Grid>

                <Grid item lg={5} md={5} sm={4} xs={12} >
                  <FormikAutoComplete 
                    name="city"
                    options={citys}
                    error={errors?.city}
                    touched={touched?.city}
                    label='Cidade'
                    getOptionLabel={(option: ICity) => option.name}
                  />
                </Grid>

                <Grid item lg={5} md={5} sm={4} xs={12} >
                  <Field component={FormikTextField} label='Complemento' name='complement' />
                </Grid>

                <Grid item lg={10} md={10} sm={10} xs={10} />

                <Grid item lg={2} md={2} sm={2} xs={12} >
                  <Box 
                    display='flex' 
                    alignItems='center' 
                    justifyContent='space-around'
                    height='100%'
                  >
                    <Fab 
                      color="primary" 
                      size='small'
                      onClick={submitForm} 
                    >
                      <Check />
                    </Fab>

                    <Fab
                      color="secondary" 
                      size='small' 
                      onClick={() => {
                        setIsAddingAddress(false)
                        resetForm()
                      }} 
                    >
                      <Delete />
                    </Fab>
                  </Box>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export { Adresses }