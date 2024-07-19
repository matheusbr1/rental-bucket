import { api } from "../lib/axios";
import { Truck } from "./get-trucks";

export async function updateTruck(truck: Truck) {
  return await api.put(`/trucks/${truck.id}`, {
    brand_id: truck.brand_id,
    model_id: truck.model_id,
    plate: truck.plate,
    renavam: truck.renavam,
    manufacture_year: truck.manufacture_year,
    model_year: truck.model_year
  })
}