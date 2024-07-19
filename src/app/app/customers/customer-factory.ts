import { Customer } from "@/app/api/get-customers"
import { Contact_Type } from "./customer-details"
import { getUserFromSession } from "@/app/helpers/get-user-from-session"

// const user = getUserFromSession()

export function customerFactory(): Customer {
  return {
    company_id: '',
    person_type: 'F',
    CPF_CNPJ: '',
    name: '',
    company_name: '',
    fantasy_name: '',
    adresses: [addressFactory()],
    contacts: [
      contactFactory('cellphone'),
      contactFactory('email'),
    ]
  }
}

export function addressFactory() {
  return {
    CEP: '',
    street: '',
    neighborhood: '',
    state: '',
    city: '',
    number: '',
    complement: '',
  }
}

export function contactFactory(contact_type: Contact_Type) {
  return { contact_type, contact: '' }
}