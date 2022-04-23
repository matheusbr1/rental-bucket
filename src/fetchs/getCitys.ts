import axios from 'axios'
import { ICity } from 'interfaces'

interface ICityAPI {
  id: number
  nome: string
}

export async function getCitys(state: string): Promise<ICity[]> {
  const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)

  const citys: ICity[] = data.map(({ id, nome }: ICityAPI) => ({
    id,
    name: nome
  }))

  return citys
} 