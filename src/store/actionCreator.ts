import { ICustomer, IDriver, ITruck, IWork } from 'interfaces'
import { Actions } from './actionTypes'

export function createCustomer(customer: ICustomer) {
  return { type: Actions.CREATE_CUSTOMER, payload: customer }
}

export function createWork(work: IWork) {
  return { type: Actions.CREATE_WORK, payload: work }
}

export function setDrivers (drivers: IDriver[]) {
  return { type: Actions.SET_DRIVERS, payload: drivers }
}

export function createDriver(driver: IDriver) {
  return { type: Actions.CREATE_DRIVER, payload: driver }
}

export function createTruck(truck: ITruck) {
  return { type: Actions.CREATE_TRUCK, payload: truck }
}
