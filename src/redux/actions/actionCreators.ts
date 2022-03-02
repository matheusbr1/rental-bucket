import { ICustomer, IDriver, ITruck, IWork } from 'interfaces'
import { CustomerActions, DriverActions, TruckActions, WorkActions } from '../constants/actionTypes'

// Customer
export function createCustomer(customer: ICustomer) {
  return { type: CustomerActions.CREATE_CUSTOMER, payload: customer }
}

// Work
export function createWork(work: IWork) {
  return { type: WorkActions.CREATE_WORK, payload: work }
}

// Driver
export function setDrivers (drivers: IDriver[]) {
  return { type: DriverActions.SET_DRIVERS, payload: drivers }
}

export function createDriver(driver: IDriver) {
  return { type: DriverActions.CREATE_DRIVER, payload: driver }
}

// Truck
export function createTruck(truck: ITruck) {
  return { type: TruckActions.CREATE_TRUCK, payload: truck }
}
