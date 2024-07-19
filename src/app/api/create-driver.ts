import { getUserFromSession } from "../helpers/get-user-from-session";
import { api } from "../lib/axios";
import { contactsAdapter } from "./shared/contacts-adapter";
import { Driver } from "./get-drivers";

export async function createDriver(driver: Driver) {
  const user = getUserFromSession()
  return await api.post('/drivers', {
    name: driver.name,
    CPF: driver.CPF,
    RG: driver.RG,
    CNH: driver.CNH,
    birthday: driver.birthday,
    company_id: user.company_id,
    contacts: contactsAdapter(driver.contacts),
    address: driver.address
  })
}
