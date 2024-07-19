import { api } from "../lib/axios";

export async function getWorkTypes() {
  return await api.get<{ id: string, name: string }[]>('work/types')
}