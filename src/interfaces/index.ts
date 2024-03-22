import { ICustomerInitialState } from "store/customer/customer.reducer"
import { IDriverInitialState } from "store/driver/driver.reducer"
import { ITruckInitialState } from "store/truck/truck.reducer"
import { IUserInitialState } from "store/user/user.reducer"
import { IWorkInitialState } from "store/work/work.reducer"

export type PersonType = 'F' | 'J'
export type FormStatus = 'isFilling' | 'isViewing'

export interface IDefaultRootState {
  works: IWorkInitialState
  trucks: ITruckInitialState
  drivers: IDriverInitialState
  customers: ICustomerInitialState,
  user: IUserInitialState
}

export interface ISignInFields {
  email: string
  password: string
}

export interface ReducerAction {
  type: string
  payload?: any
}
export interface IAddress {
  id?: string
  CEP: string
  street: string
  number: string
  neighborhood: string
  state: string | null
  city: string | null
  complement?: string
}

export type ContactType = 'phone' | 'cellphone' | 'email'

export interface IContact {
  id?: string
  contact: string
  contact_type: ContactType
}

export interface ICustomer {
  id: string
  person_type: PersonType
  CPF_CNPJ: string
  name?: string
  company_name?: string
  fantasy_name?: string
  contacts: IContact[]
  adresses: IAddress[]
}

export interface IDriver {
  id: string
  name: string
  CPF: string
  RG: string
  CNH: string
  birthday: Date | null
  address: IAddress
  contacts: IContact[]
}

export interface IWorkType {
  id?: string
  name: string
}

export interface IEquipment {
  id?: string
  name: string
  description: string
  capacity: string
}

export interface IWork {
  id: string
  customer: ICustomer
  driver: IDriver
  end_date: Date
  equipment: IEquipment
  quantity: number
  work_type: IWorkType
  truck: ITruck
  address: IAddress
  is_done: boolean
}

export interface IBrand {
  id: number
  name: string
}

export interface IModel {
  id: string
  name: string
}

export interface ITruckType {
  id?: string
  name: string
  description: string
}

export interface ITruck {
  id: string
  brand: IBrand | null
  model: IModel | null
  plate: string
  equipment: string
  renavam: string
  manufacture_year: number
  model_year: number
  type?: ITruckType | null
}