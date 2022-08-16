import axios from 'axios'

interface ICityAPI {
  id: number
  nome: string
}

export async function getCitys(state: string): Promise<string[]> {
  const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)

  const citys: string[] = data.map(({ nome }: ICityAPI) => nome)

  return citys
} 