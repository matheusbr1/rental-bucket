import axios from 'axios'
import { IModel } from 'interfaces'

interface IModelAPI {
  codigo: string
  nome: string
}

export async function getModels(brandId: number): Promise<IModel[]> {
  const { data } = await axios
    .get(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${brandId}/modelos`)

  const models: IModel[] = data.map(({ codigo, nome }: IModelAPI) => ({
    id: Number(codigo),
    name: nome
  }))

  return models
}