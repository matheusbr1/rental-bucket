import { ITruck } from "interfaces"

export enum TruckActions {
  SET_TRUCKS = 'SET_TRUCKS',
  CREATE_TRUCK = 'CREATE_TRUCK',
}

export function setTrucks(trucks: ITruck[]) {
  return { type: TruckActions.SET_TRUCKS, payload: trucks }
}

export function createTruck(truck: ITruck) {
  return { type: TruckActions.CREATE_TRUCK, payload: truck }
}