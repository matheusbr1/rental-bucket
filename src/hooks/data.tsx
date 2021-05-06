import React, { createContext, useState, useContext, useCallback } from 'react'

export interface IAdress { 
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
  CPF?: string
  CNPJ?: string
  name: string
  stateRegistration?: string
  contacts: IContact[]
  adress: IAdress[]
}

export interface IDriver {
  name: string
  CPF: string
  RG: string
  CNH: string
  birthday: string | Date
  adress: IAdress
  contact: {
    telephone: string
    cellphone: string
    email: string
  }
}

export interface IService {
  adress: string
  client: string
  driver: string
  endDate: Date
  equipment: string
  quantity: number
  service: string
  truck: string
}

export interface ITruck {
  brand: string
  equipment: string
  model: string
  plate: string
  renavam: string
  year: {
    manufacture: string
    model: string
  }
}

interface IDataContext {
  services: IService[]
  createNewService(service: IService): void
  trucks: ITruck[]
  createNewTruck(truck: ITruck): void
  drivers: IDriver[]
  createNewDriver(driver: IDriver): void
  clients: IClient[]
  createNewClient(client: IClient): void
}

const DataContext = createContext<IDataContext>({} as IDataContext)

const DataProvider: React.FC = ({ children }) => {

  const [services, setServices] = useState<IService[]>([{
    adress: "05628-040",
    client: "Antonio Kauê Lucca da Luz",
    driver: "João Diogo da Rosa",
    endDate: new Date(),
    equipment: "Container de lixo",
    quantity: 1,
    service: "Retirada",
    truck: "DAD-8320",
  }])

  const createNewService =  useCallback((service: IService) => {
    setServices(otherServices => [
      ...otherServices,
      service
    ])
  }, [])

  const [trucks, setTrucks] = useState<ITruck[]>([{
    brand: "Mercedes",
    equipment: "Rollon",
    model: "Ranger XLT 3.0 PSE 163cv 4x4 CD TB Dies",
    plate: "BAO-0061",
    renavam: "10321312",
    year: {
      manufacture: "2001",
      model: "2001",
    }
  }])

  const createNewTruck =  useCallback((truck: ITruck) => {
    setTrucks(otherTrucks => [
      ...otherTrucks,
      truck
    ])
  }, [])

  const [drivers, setDrivers] = useState<IDriver[]>([{
    name: 'Theo Thomas Leonardo das Neves',
    CPF: '337.117.348-80',
    RG: '20.498.441-5',
    CNH: '123123',
    birthday: '23/06/1972',
    adress: { 
      CEP: '05396-010', 
      street: 'Rua Antenor de Freitas', 
      number: '393',  
      neighborhood: 'Parque dos Príncipes',
      state: 'SP', 
      city: 'Osasco',
      complement: ''
    },
    contact: {
      telephone: '(11) 2644-3809',
      cellphone: '(11) 99141-9747',
      email: 'theoThomas@gmail.com'
    }
  }])

  const createNewDriver = useCallback((driver: IDriver) => {
    setDrivers(otherDrivers => [
      ...otherDrivers,
      driver
    ])
  }, [])

  const [clients, setClients] = useState<IClient[]>([{
    CPF: '568.753.008-85',
    name: 'Larissa Caroline de Paula',
    contacts: [{
      type: 'cellphone',
      cellphone: '(11) 97878-9090'
    }],
    adress: [
      { 
        CEP: '05763-440', 
        street: 'Rua João Rodrigues de Moura', 
        number: '321',  
        neighborhood: 'Jardim Piracuama',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      },
      { 
        CEP: '05628-040',  
        street: 'Rua Doutor João José de Carvalho', 
        number: '12',  
        neighborhood: 'Vila Sônia',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      }
    ]
  }])

  const createNewClient = useCallback((client: IClient) => {
   setClients(otherClients => ([
     ...otherClients,
     client
   ]))
  }, [])

 return (
    <DataContext.Provider value={{ 
      services, 
      createNewService,
      trucks,
      createNewTruck,
      drivers,
      createNewDriver,
      clients,
      createNewClient
    }}>
      {children}
    </DataContext.Provider>
 )
}

function useData (): IDataContext {
  const context = useContext(DataContext)
  return context
}

export { useData, DataProvider }