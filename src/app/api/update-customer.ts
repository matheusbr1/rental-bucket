import { api } from "../lib/axios";
import { Customer } from "./get-customers";

export async function updateCustomer(customer: Customer) {
  return await api.put(`/customers/${customer.id}`, {
    person_type: customer.person_type,
    name: customer.name,
    CPF_CNPJ: customer.CPF_CNPJ,
    company_name: customer.company_name,
    fantasy_name: customer.fantasy_name,
    contacts: customer.contacts,
    adresses: customer.adresses
  })
}

