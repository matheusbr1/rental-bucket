import { IDriver } from "interfaces"

export enum DriverActions {
  SET_DRIVERS = 'SET_DRIVERS',
  CREATE_DRIVER = 'CREATE_DRIVER',
  SET_CURRENT_DRIVER = 'SET_CURRENT_DRIVER',
  DELETE_DRIVER = 'DELETE_DRIVER',
  UPDATE_DRIVER = 'UPDATE_DRIVER',
}

export function setDrivers (drivers: IDriver[]) {
  return { type: DriverActions.SET_DRIVERS, payload: drivers }
}

export function createDriver(driver: IDriver) {
  return { type: DriverActions.CREATE_DRIVER, payload: driver }
}

export function setCurrentDriver(driver: IDriver) {
  return { type: DriverActions.SET_CURRENT_DRIVER, payload: driver }
}

export function deleteDriver(id: string) {
  return { type: DriverActions.DELETE_DRIVER, payload: id }
}

export function updateDriver(id: string, updatedDriver: IDriver) {
  return { type: DriverActions.UPDATE_DRIVER, payload: {
    id,
    updatedDriver
  }}
}