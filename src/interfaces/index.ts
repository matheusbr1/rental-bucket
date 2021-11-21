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

export interface ICustomer {
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

export interface IWork {
  id: number
  address: string
  customer: string
  driver: string
  endDate: Date
  equipment: string
  quantity: number
  work: string
  truck: string
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