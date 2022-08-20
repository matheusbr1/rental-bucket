import { ITruck } from "interfaces";

export interface ITruckApi {
  brand_id: string
  id: string
  manufacture_year: string
  model_id: string
  model_year: string
  plate: string
  renavam: string
}

export function formatTruck (truckApi: ITruckApi): ITruck {
  let data: ITruck = {} as ITruck

  data = {
    ...truckApi,
    equipment: '',
    manufacture_year: +truckApi.manufacture_year,
    model_year: +truckApi.model_year,
    brand: { id: +truckApi.brand_id, name: '' },
    model: { id: truckApi.model_id, name: '' },
  }

  return data
}

export function formatTrucks (trucksApi: ITruckApi[]): ITruck[] {
  return trucksApi.map(truck => formatTruck(truck))
}