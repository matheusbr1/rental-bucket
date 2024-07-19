import { api } from "../lib/axios";

export async function deleteDriver(id: string) {
  await api.delete(`/drivers/${id}`)
}