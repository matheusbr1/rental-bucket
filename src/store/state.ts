import { IState } from 'interfaces'

import {  
  drivers as mockedDrivers,  
  trucks as mockedTrucks, 
  works as mockedWorks, 
  customers as mockedCustomers 
} from 'mocks'

export const INITIAL_STATE: IState = {
  works: mockedWorks,
  trucks: mockedTrucks,
  drivers: mockedDrivers,
  customers: mockedCustomers
}