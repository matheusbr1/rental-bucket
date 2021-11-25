import React, { createContext, useState, useContext, useCallback, useEffect } from 'react'
import { IWork, ITruck, IDriver, ICustomer } from 'interfaces'
import { api } from 'services/api'
import { 
  drivers as mockedDrivers, 
  trucks as mockedTrucks, 
  works as mockedWorks,
  customers as mockedCustomers
} from 'mocks'

interface IDataContext {
  works: IWork[]
  createWork(work: IWork): void
  trucks: ITruck[]
  createTruck(truck: ITruck): void
  drivers: IDriver[]
  createDriver(driver: IDriver): void
  customers: ICustomer[]
  createCustomer(customer: ICustomer): void
}

const DataContext = createContext<IDataContext>({} as IDataContext)

const DataProvider: React.FC = ({ children }) => {
  const [works, setWorks] = useState<IWork[]>(mockedWorks)
  const [trucks, setTrucks] = useState<ITruck[]>(mockedTrucks)
  const [drivers, setDrivers] = useState<IDriver[]>(mockedDrivers)
  const [customers, setCustomers] = useState<ICustomer[]>(mockedCustomers)

  const createWork =  useCallback((work: IWork) => {
    setWorks(otherWorks => [
      ...otherWorks,
      work
    ])
  }, [])

  const createTruck =  useCallback((truck: ITruck) => {
    setTrucks(otherTrucks => [
      ...otherTrucks,
      truck
    ])
  }, [])

  const createDriver = useCallback((driver: IDriver) => {
    setDrivers(otherDrivers => [
      ...otherDrivers,
      driver
    ])
  }, [])

  const createCustomer = useCallback((customer: ICustomer) => {
    setCustomers(otherCustomers => ([
     ...otherCustomers,
     customer
   ]))
  }, [])

  // Getting data
  useEffect(() => {
    api.get('/drivers').then(response => {
      setDrivers(response.data)
    })
  }, [])

 return (
    <DataContext.Provider value={{ 
      works, 
      createWork,
      trucks,
      createTruck,
      drivers,
      createDriver,
      customers,
      createCustomer
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