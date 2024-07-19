import { api } from "../lib/axios";

export async function getEquipments() {
  return await api.get<{
    id: string,
    name: string,
  }[]>('truck/types/equipments')
}