import { getUserFromSession } from "../helpers/get-user-from-session";
import { api } from "../lib/axios";
import { BUG_NUMBER, LIMIT_ITEMS_ON_RESPONSE } from "./shared/configs";

export type Truck = {
  id: string
  company_id: string
  brand_id: string
  model_id: string
  plate: string
  renavam: number | null
  manufacture_year: number | null
  model_year: number | null
}

export async function getTrucks(page?: number) {
  const user = getUserFromSession()
  return await api.get<{
    trucks: Truck[]
    pageCount: number
    total: number
  }>('/trucks', {
    params: {
      company_id: user.company_id,
      page: page ?? 1,
      limit: page ? LIMIT_ITEMS_ON_RESPONSE : BUG_NUMBER
    }
  })
}