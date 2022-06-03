import { ICustomerInitialState } from "redux/customer/customer.reducer"
import { IDriverInitialState } from "redux/driver/driver.reducer"
import { ITruckInitialState } from "redux/truck/truck.reducer"
import { IUserInitialState } from "redux/user/user.reducer"
import { IWorkInitialState } from "redux/work/work.reducer"

export type PersonType = 'F' | 'J'
export type FormStatus = 'isFilling' | 'isViewing'

export interface IDefaultRootState  {
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


export interface IState {
  sigla: string
  nome: string
}

export interface ICity {
  name: string
}

export interface IAddress { 
  CEP: string
  street: string
  number: string
  neighborhood: string
  state: IState | null
  city: ICity | null
  complement?: string
}

export type ContactType = 'phone' | 'cellphone' | 'email'

export interface IContact {
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
}

export interface IBrand {
  id: number
  name: string
}

export interface IModel {
  id: string
  name: string
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
  type?: {
    name: string
    description: string
  }
}