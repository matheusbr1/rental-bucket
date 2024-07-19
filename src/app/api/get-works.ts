import { getUserFromSession } from "../helpers/get-user-from-session"
import { api } from "../lib/axios"
import { Customer } from "./get-customers";
import { Driver } from "./get-drivers";
import { Truck } from "./get-trucks";
import { LIMIT_ITEMS_ON_RESPONSE } from "./shared/configs";

export type WorkStatus = "pending" | "placed" | "partial-removed" | "removed" | "canceled";

export type Work = {
  id?: string
  start_date: string
  end_date: string
  status: WorkStatus
  quantity: string
  company_id: string
  customer: Customer
  truck: Truck
  driver: Driver
  equipment: {
    name: string
  }
  work_type: {
    name: string
  },
}

export async function getWorks(page: number) {
  const user = getUserFromSession()
  return await api.get<{
    works: Work[]
    pageCount: number
    total: number
  }>('works', {
    params: {
      company_id: user.company_id,
      page,
      limit: LIMIT_ITEMS_ON_RESPONSE
    },
  })
}