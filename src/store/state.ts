import { IStore } from 'interfaces'

import {  
  drivers as mockedDrivers,  
  trucks as mockedTrucks, 
  works as mockedWorks, 
  customers as mockedCustomers 
} from 'mocks'

export const INITIAL_STATE: IStore = {
  works: mockedWorks,
  trucks: mockedTrucks,
  drivers: mockedDrivers,
  customers: mockedCustomers,
  work: {
    id: 0,
    customer: '',
    address: '',
    driver: '',
    truck: '',
    equipment: '',
    work: '',
    quantity: 1,
    endDate: new Date()
  } 
}