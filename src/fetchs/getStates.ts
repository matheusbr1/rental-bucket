import axios from 'axios'
import { IState } from 'interfaces'

export async function getStates(): Promise<IState[]> {
  const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')

  return data
} 