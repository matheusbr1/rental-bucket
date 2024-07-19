import { api } from "../lib/axios";

export async function deleteTruck(id: string) {
  await api.delete(`/trucks/${id}`)
}