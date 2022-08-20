import { formatCustomers, formatCustomer } from "helpers/formatCustomers"
import { ICustomer } from "interfaces"

export enum CustomerActions {
  SET_CUSTOMERS = 'SET_CUSTOMERS',
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  SET_CURRENT_CUSTOMER = 'SET_CURRENT_CUSTOMER',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',
  UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
}

export function createCustomer(customer: ICustomer) {
  return { type: CustomerActions.CREATE_CUSTOMER, payload: customer }
}

export function setCustomers(customers: ICustomer[]) {
  return { type: CustomerActions.SET_CUSTOMERS, payload: formatCustomers(customers) }
}

export function setCurrentCustomer(customer: ICustomer) {
  return { type: CustomerActions.SET_CURRENT_CUSTOMER, payload: formatCustomer(customer) }
}

export function deleteCustomer(id: string) {
  return { type: CustomerActions.DELETE_CUSTOMER, payload: id }
}

export function updateCustomer(id: string, updatedCustomer: ICustomer) {
  return { type: CustomerActions.UPDATE_CUSTOMER, payload: {
    id,
    updatedCustomer: formatCustomer(updatedCustomer)
  }}
}