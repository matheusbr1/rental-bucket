import { getUserFromSession } from "../helpers/get-user-from-session";
import { api } from "../lib/axios";
import { Truck } from "./get-trucks";

export async function createTruck(truck: Truck) {
  const user = getUserFromSession()
  return await api.post('/trucks', {
    brand_id: truck.brand_id,
    model_id: truck.model_id,
    plate: truck.plate,
    renavam: truck.renavam,
    manufacture_year: truck.manufacture_year,
    model_year: truck.model_year,
    company_id: user.company_id,
    "truck_type_id": "af61d52c-5dd9-4df1-bc3b-039d604e8ca9",
  })
}