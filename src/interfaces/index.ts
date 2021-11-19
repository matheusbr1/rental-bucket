export interface IAddress { 
  CEP: string
  street: string
  number: string
  neighborhood: string
  state: string
  city: string
  complement?: string
}

export interface IContact {
  type: string
  telephone?: string
  cellphone?: string
  email?: string
}

export interface IClient {
  id: number
  CPF?: string
  CNPJ?: string
  name: string
  stateRegistration?: string
  contacts: IContact[]
  address: IAddress[]
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

export interface IService {
  id: number
  address: string
  client: string
  driver: string
  endDate: Date
  equipment: string
  quantity: number
  service: string
  truck: string
}

export interface IBrand {
  id: number
  name: string
}

export interface IModel {
  id: string
  marca: string
  name: string
}

export interface ITruck {
  id: number
  brand: IBrand | any
  model: IModel | any
  plate: string
  equipment: string
  renavam: string
  year: {
    manufacture: string
    model: string
  }
}