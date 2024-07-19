import { api } from "../lib/axios";
import { contactsAdapter } from "./shared/contacts-adapter";
import { Driver } from "./get-drivers";

export async function updateDriver(driver: Driver) {
  return await api.put(`/drivers/${driver.id}`, {
    name: driver.name,
    CPF: driver.CPF,
    RG: driver.RG,
    CNH: driver.CNH,
    birthday: driver.birthday,
    contacts: contactsAdapter(driver.contacts),
    address: driver.address
  })
}

