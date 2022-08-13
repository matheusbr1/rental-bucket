import { ITruck } from "interfaces"

export enum TruckActions {
  SET_TRUCKS = 'SET_TRUCKS',
  CREATE_TRUCK = 'CREATE_TRUCK',
  SET_CURRENT_TRUCK = 'SET_CURRENT_TRUCK',
  DELETE_TRUCK = 'DELETE_TRUCK',
  UPDATE_TRUCK = 'UPDATE_TRUCK',
}

export function setTrucks(trucks: ITruck[]) {
  return { type: TruckActions.SET_TRUCKS, payload: trucks }
}

export function createTruck(truck: ITruck) {
  return { type: TruckActions.CREATE_TRUCK, payload: truck }
}

export function setCurrentTruck(truck: ITruck) {
  return { type: TruckActions.SET_CURRENT_TRUCK, payload: truck }
}

export function deleteTruck(id: string) {
  return { type: TruckActions.DELETE_TRUCK, payload: id }
}

export function updateTruck(id: string, updatedTruck: ITruck) {
  return { type: TruckActions.UPDATE_TRUCK, payload: {
    id,
    updatedTruck
  }}
}