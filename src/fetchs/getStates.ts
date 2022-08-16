import axios from 'axios'

interface IStateAPI {
  sigla: string
}

export async function getStates(): Promise<string[]> {
  const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')

  return data.map((state: IStateAPI) => state.sigla)
} 