import { ICustomerInitialState } from "redux/customer/customer.reducer"
import { IDriverInitialState } from "redux/driver/driver.reducer"
import { ITruckInitialState } from "redux/truck/truck.reducer"
import { IUserInitialState } from "redux/user/user.reducer"
import { IWorkInitialState } from "redux/work/work.reducer"

export type PersonType = 'F' | 'J'

export interface IDefaultRootState  {
  works: IWorkInitialState
  trucks: ITruckInitialState
  drivers: IDriverInitialState
  customers: ICustomerInitialState,
  user: IUserInitialState
}

export interface ReducerAction {
  type: string
  payload?: any
}

export interface ISignInFields {
  email: string
  password: string
}
export interface ISignUpFields {
  name: string
  email: string
  password: string
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

export type contactType = 'phone' | 'cellphone' | 'email'

export interface IContact {
  contact: string
  contact_type: contactType
}

export interface ICustomer {
  person_type: PersonType
  id: number
  CPF_CNPJ: string
  name?: string
  company_name?: string
  fantasy_name?: string
  contacts: IContact[]
  adresses: IAddress[]
}

export interface IDriver {
  id: number
  name: string
  CPF: string
  RG: string
  CNH: string
  birthday: string | Date
  address: IAddress
  contact: {
    telephone: string
    cellphone: string
    email: string
  }
}

export interface IWork {
  id: number
  customer: ICustomer
  driver: IDriver
  endDate: Date
  equipment: string
  quantity: number
  type: string
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
  id: number
  brand: IBrand | null
  model: IModel | null
  plate: string
  equipment: string
  renavam: string
  year: {
    manufacture: string
    model: string
  }
}