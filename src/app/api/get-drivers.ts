import { formatDate } from "../helpers/format-date"
import { getUserFromSession } from "../helpers/get-user-from-session"
import { api } from "../lib/axios"
import { BUG_NUMBER, LIMIT_ITEMS_ON_RESPONSE } from "./shared/configs"

type Address = {
  id: string
  CEP: string
  street: string
  number: string
  neighborhood: string
  state: string
  city: string
  complement: string
  lat: string
  lng: string
}

interface Client {
  id: string
  name: string
  CPF: string
  RG: string
  CNH: string
  birthday: string
  company_id: string
}

export type Contacts = {
  email?: string
  phone?: string
  cellphone?: string
}

export interface Driver extends Client {
  address: Address
  contacts: Contacts
}

type Contact_Type = "email" | "cellphone" | "phone"

type Contact = {
  id: string
  contact: string
  contact_type: Contact_Type
}

interface Driver_API extends Client {
  address: Address
  contacts: Contact[]
}

export async function getDrivers(page?: number) {
  const user = getUserFromSession()
  return await api.get<{
    drivers: Driver_API[]
    pageCount: number
    total: number
  }>('drivers', {
    params: {
      company_id: user.company_id,
      page: page ?? 1,
      limit: page ? LIMIT_ITEMS_ON_RESPONSE : BUG_NUMBER
    },
  })
}

export function driverAdapter(driver: Driver_API): Driver {
  return {
    ...driver,
    birthday: formatDate(new Date(driver.birthday)),
    contacts: {
      cellphone: driver.contacts.find(c => c.contact_type === 'cellphone')?.contact ?? '',
      phone: driver.contacts.find(c => c.contact_type === 'phone')?.contact ?? '',
      email: driver.contacts.find(c => c.contact_type === 'email')?.contact ?? '',
    }
  }
}