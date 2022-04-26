import { IDriver } from "interfaces"

export enum DriverActions {
  SET_DRIVERS = 'SET_DRIVERS',
  CREATE_DRIVER = 'CREATE_DRIVER',
}

export function setDrivers (drivers: IDriver[]) {
  return { type: DriverActions.SET_DRIVERS, payload: drivers }
}

export function createDriver(driver: IDriver) {
  return { type: DriverActions.CREATE_DRIVER, payload: driver }
}