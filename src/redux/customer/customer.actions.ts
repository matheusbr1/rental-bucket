import { ICustomer } from "interfaces"

export enum CustomerActions {
  RESET_STATE = 'RESET_STATE',
  SET_CUSTOMERS = 'SET_CUSTOMERS',
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
}

export function createCustomer(customer: ICustomer) {
  return { type: CustomerActions.CREATE_CUSTOMER, payload: customer }
}

export function setCustomers(customers: ICustomer[]) {
  return { type: CustomerActions.SET_CUSTOMERS, payload: customers }
}