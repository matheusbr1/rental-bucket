import { formatTruck, formatTrucks, ITruckApi } from "helpers/formatTrucks"
import { IBrand, IModel } from "interfaces"

export enum TruckActions {
  SET_TRUCKS = 'SET_TRUCKS',
  CREATE_TRUCK = 'CREATE_TRUCK',
  SET_CURRENT_TRUCK = 'SET_CURRENT_TRUCK',
  SET_TRUCK_BRAND = 'SET_TRUCK_BRAND',
  SET_TRUCK_MODEL = 'SET_TRUCK_MODEL',
  DELETE_TRUCK = 'DELETE_TRUCK',
  UPDATE_TRUCK = 'UPDATE_TRUCK',
}

export function setTrucks(trucks: ITruckApi[]) {
  return { type: TruckActions.SET_TRUCKS, payload: formatTrucks(trucks) }
}

export function createTruck(truck: ITruckApi) {
  return { type: TruckActions.CREATE_TRUCK, payload: formatTruck(truck) }
}

export function setCurrentTruck(truck: ITruckApi) {
  return { type: TruckActions.SET_CURRENT_TRUCK, payload: formatTruck(truck) }
}

export function setTruckBrand(brand: IBrand) {
  return { type: TruckActions.SET_TRUCK_BRAND, payload: brand }
}

export function setTruckModel(model: IModel) {
  return { type: TruckActions.SET_TRUCK_MODEL, payload: model }
}

export function deleteTruck(id: string) {
  return { type: TruckActions.DELETE_TRUCK, payload: id }
}

export function updateTruck(id: string, updatedTruck: ITruckApi) {
  return { type: TruckActions.UPDATE_TRUCK, payload: {
    id,
    updatedTruck: formatTruck(updatedTruck)
  }}
}