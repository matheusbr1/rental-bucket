import React, { createContext, useState, useContext, useCallback, useEffect } from 'react'
import { IWork, ITruck, IDriver, ICustomer } from 'interfaces'
import { drivers as mockedDrivers } from 'mocks'
import { api } from 'services/api'

interface IDataContext {
  works: IWork[]
  createNewWork(work: IWork): void
  trucks: ITruck[]
  createNewTruck(truck: ITruck): void
  drivers: IDriver[]
  createNewDriver(driver: IDriver): void
  customers: ICustomer[]
  createNewCustomer(customer: ICustomer): void
}

const DataContext = createContext<IDataContext>({} as IDataContext)

const DataProvider: React.FC = ({ children }) => {

  const [works, setWorks] = useState<IWork[]>([{
    id: 1,
    address: "05628-040",
    customer: "Antonio Kauê Lucca da Luz",
    driver: "João Diogo da Rosa",
    endDate: new Date(),
    equipment: "Container de lixo",
    quantity: 1,
    work: "Retirada",
    truck: "DAD-8320",
  }])

  const createNewWork =  useCallback((work: IWork) => {
    setWorks(otherWorks => [
      ...otherWorks,
      work
    ])
  }, [])

  const [trucks, setTrucks] = useState<ITruck[]>([{
    id: 1,
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

  const [drivers, setDrivers] = useState<IDriver[]>(mockedDrivers)

  const createNewDriver = useCallback((driver: IDriver) => {
    setDrivers(otherDrivers => [
      ...otherDrivers,
      driver
    ])
  }, [])

  const [customers, setCustomers] = useState<ICustomer[]>([{
    id: 1,
    CPF: '568.753.008-85',
    name: 'Larissa Caroline de Paula',
    contacts: [{
      type: 'cellphone',
      cellphone: '(11) 97878-9090'
    }],
    address: [
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
  }, {
    id: 2,
    CPF: '473.007.178-61',
    name: 'Matheus Baron Ribeiro',
    contacts: [{
      type: 'cellphone',
      cellphone: '(11) 97803-5721'
    }],
    address: [
      { 
        CEP: '06065-220   ', 
        street: 'Rua Santo Roverco', 
        number: '187',  
        neighborhood: 'Jaguaribe',
        state: 'SP', 
        city: 'São Paulo',
        complement: ''
      }
    ]
  }])

  const createNewCustomer = useCallback((customer: ICustomer) => {
    setCustomers(otherCustomers => ([
     ...otherCustomers,
     customer
   ]))
  }, [])

  useEffect(() => {
    api.get('/drivers').then(response => {
      setDrivers(response.data)
    })
  }, [])

 return (
    <DataContext.Provider value={{ 
      works, 
      createNewWork,
      trucks,
      createNewTruck,
      drivers,
      createNewDriver,
      customers,
      createNewCustomer
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