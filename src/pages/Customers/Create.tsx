/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import AppBar  from 'components/AppBar'
import { useSnackbar } from 'notistack'
import { useData } from 'hooks/useData'
import { ICity, IState } from 'interfaces'
import Button from 'components/Button'
import axios from 'axios'
import { getCitys } from 'fetchs/getCitys'
import { getStates } from 'fetchs/getStates'
import { createCustomer } from 'store/actionCreator'
import { 
  Box,
  Container, 
  Divider, 
  FormControlLabel, 
  Grid, 
  MenuItem, 
  Radio, 
  RadioGroup, 
  TextField, 
  Typography 
} from '@material-ui/core'

interface AddressProps {
  logradouro: string 
  uf: string 
  localidade: string  
  bairro: string 
}

const Create: React.FC = () => {
  const { goBack } = useHistory()

  const { dispatch  } = useData()

  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [states, setStates] = useState<IState[]>([])
  const [state, setState] = useState<IState>()
  const [city, setCity] = useState<ICity>()
  const [citys, setCitys] = useState<ICity[]>([])

  // Getting States
  useEffect(() => {
    (async () => {
      const states = await getStates()
      setStates(states)
    })()
  }, [])

  // Getting Citys
  useEffect(() => {
    if (!state) {
      return
    }

    (async () => {
      const citys = await getCitys(state.sigla)
      setCitys(citys)
    })()
  }, [state])

  const handleGetAdress = useCallback(e => {
    const cep = e.target.value

    axios
      .get(`https://viacep.com.br/ws/${cep}/json`)
      .then(response => {

      if (!response.data) {
        return
      }

      const { logradouro, uf, localidade, bairro }: AddressProps = response.data
    })
  },[])

  const handleCreate = useCallback((fields) => {
    setLoading(true)

    try {
      // Requisição

      dispatch(createCustomer(fields))

      enqueueSnackbar('Cliente criado com sucesso!', {
        variant: 'success'
      })

      goBack()
    } catch (error) {
      enqueueSnackbar('Erro ao criar cliente, tente novamente!', {
        variant: 'error'
      })
    } finally {
      setLoading(false)
    }

  }, [goBack, enqueueSnackbar, dispatch])

  return (
    <Container maxWidth='md' style={{ marginTop: 100 }} >
      <AppBar search={false} />

      <Grid container spacing={3} justify='flex-end' >
        <Grid item lg={12} md={12} sm={12} >
          <Typography variant='h1' >
            Novo Cliente
          </Typography>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} >
          <RadioGroup name='person' id="person" row >
            <FormControlLabel
              value="F"
              defaultChecked
              label="Pessoa Física"
              control={<Radio />}
            />

            <FormControlLabel
              value="J"
              label="Pessoa Jurídica"
              control={<Radio />}
            />
          </RadioGroup>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12} >
          <TextField 
            fullWidth
            label='CPF'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12} >
          <TextField 
            fullWidth
            label='Nome'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Divider style={{ margin: '2rem 0' }} />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography variant='h3' >
            Endereço
          </Typography>
        </Grid>

        <Grid item lg={2} md={2} sm={4} xs={12} >
          <TextField 
            fullWidth
            label='CEP'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={10} md={10} sm={8} xs={12} >
          <TextField 
            fullWidth
            label='Logradouro'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={2} md={2} sm={4} xs={12} >
          <TextField 
            fullWidth
            label='Número'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={10} md={10} sm={8} xs={12} >
          <TextField 
            fullWidth
            label='Bairro'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={2} md={2} sm={4} xs={12} >
          <TextField
            select
            fullWidth
            name='state' 
            label='UF'
            variant="outlined" 
          >
            {states.map(state => (
              <MenuItem value={state.sigla} key={state.sigla} > {state.sigla} </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={5} md={5} sm={4} xs={12} >
          <TextField
            select
            fullWidth
            name='city' 
            label='Cidade'
            variant="outlined" 
          >
            {citys.map(city => (
              <MenuItem value={city.name} key={city.id} > {city.name} </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={5} md={5} sm={4} xs={12} >
          <TextField 
            fullWidth
            label='Complemento'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Divider style={{ margin: '2rem 0' }} />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Typography variant='h3' >
            Contato
          </Typography>
        </Grid>

        <Grid item lg={4} md={4} sm={4} xs={12} >
          <TextField 
            fullWidth
            label='Celular'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={4} md={4} sm={4} xs={12} >
          <TextField 
            fullWidth
            label='E-mail'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={4} md={4} sm={4} xs={12} >
          <TextField 
            fullWidth
            label='Telefone'
            variant='outlined'
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12} >
          <Divider style={{ margin: '2rem 0' }} />
        </Grid>

        <Grid item lg={4} md={4} sm={4} xs={12} >
          <Box mb='2rem' >
            <Button loading={loading} color='primary' type='submit' >
              Criar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Create