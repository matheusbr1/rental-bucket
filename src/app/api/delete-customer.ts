import { api } from "../lib/axios";

export async function deleteCustomer(id: string) {
  await api.delete(`/customers/${id}`)
}