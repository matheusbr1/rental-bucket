import { ICustomer, ReducerAction } from 'interfaces'
import { CustomerActions } from './customer.actions'

export type ICustomerInitialState = ICustomer[]

export function customerReducer (
  state: ICustomerInitialState = [], 
  action: ReducerAction
): ICustomerInitialState {
  switch (action.type) {
    case CustomerActions.SET_CUSTOMERS:
      return action.payload

    case CustomerActions.CREATE_CUSTOMER: 
      return state.concat({
        id: state.length + 1,
        ...action.payload
      })

    default:
      return state
  }
}