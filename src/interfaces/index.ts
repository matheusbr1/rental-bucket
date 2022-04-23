type PersonType = 'F' | 'J'

export interface IDefaultRootState  {
  work: {
    works: IWork[]
  }
  truck: {
    trucks: ITruck[]
  }
  driver: {
    drivers:  IDriver[]
  }
  customer: {
    customers: ICustomer[]
  }
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

export interface IContact {
  telephone: string
  cellphone: string
  email: string
}



export interface ICustomer {
  personType: PersonType
  id: number
  CPF_CNPJ: string
  name: string
  stateRegistration?: string
  contact: IContact
  address: IAddress
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