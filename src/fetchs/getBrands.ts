import axios from 'axios'
import { IBrand } from 'interfaces'

interface IBrandAPI {
  codigo: string
  nome: string
}

export async function getBrands(): Promise<IBrand[]> {
  const { data } = await axios.get('https://parallelum.com.br/fipe/api/v1/caminhoes/marcas')

  const brands: IBrand[] = data.map(({ codigo, nome }: IBrandAPI) => ({
    id: Number(codigo),
    name: nome
  }))

  return brands
} 