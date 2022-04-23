import { IDriver } from "interfaces"

export enum DriverActions {
  RESET_STATE = 'RESET_STATE',
  SET_DRIVERS = 'SET_DRIVERS',
  CREATE_DRIVER = 'CREATE_DRIVER',
}

export function setDrivers (drivers: IDriver[]) {
  return { type: DriverActions.SET_DRIVERS, payload: drivers }
}

export function createDriver(driver: IDriver) {
  return { type: DriverActions.CREATE_DRIVER, payload: driver }
}