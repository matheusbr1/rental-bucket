import { getUserFromSession } from "../helpers/get-user-from-session";
import { api } from "../lib/axios";
import { Customer } from "./get-customers";

export async function createCustomer(customer: Customer) {
  const user = getUserFromSession()
  return await api.post('/customers', {
    person_type: customer.person_type,
    name: customer.name,
    CPF_CNPJ: customer.CPF_CNPJ,
    company_name: customer.company_name,
    fantasy_name: customer.fantasy_name,
    company_id: user.company_id,
    contacts: customer.contacts,
    adresses: customer.adresses
  })
}
