import { getUserFromSession } from "../helpers/get-user-from-session"
import { api } from "../lib/axios"
import { BUG_NUMBER, LIMIT_ITEMS_ON_RESPONSE } from "./shared/configs"

export type Address = {
  id?: string
  CEP: string
  street: string
  number?: string
  neighborhood: string
  state: string
  city: string
  complement?: string
  lat?: string
  lng?: string
}

interface Client {
  id?: string
  person_type: 'J' | 'F'
  CPF_CNPJ: string
  name?: string
  company_name?: string
  fantasy_name?: string
  company_id: string
}

export type Contacts = {
  email?: string
  phone?: string
  cellphone?: string
}

type Contact_Type = "email" | "cellphone" | "phone"

type Contact = {
  id?: string
  contact: string
  contact_type: Contact_Type
}

export interface Customer extends Client {
  contacts: Contact[]
  adresses: Address[]
}

export async function getCustomers(page?: number) {
  const user = getUserFromSession()
  return await api.get<{
    customers: Customer[]
    pageCount: number
    total: number
  }>('customers', {
    params: {
      company_id: user.company_id,
      page: page ?? 1,
      limit: page ? LIMIT_ITEMS_ON_RESPONSE : BUG_NUMBER
    },
  })
}
