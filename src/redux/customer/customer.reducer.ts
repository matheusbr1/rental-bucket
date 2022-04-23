import { ReducerAction } from 'interfaces'
import { CustomerActions } from './customer.actions'

const initialCustomerState = {
  customers: []
}

export type ICustomerInitialState = typeof initialCustomerState

export function customerReducer (
  state: ICustomerInitialState = initialCustomerState, 
  action: ReducerAction
): ICustomerInitialState {
  switch (action.type) {
    case CustomerActions.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      }

    case CustomerActions.CREATE_CUSTOMER: 
      return {
        ...state,
        customers: state.customers.concat({
          id: state.customers.length + 1,
          ...action.payload
        })
      }

    case CustomerActions.RESET_STATE:
      return state

    default:
      return state
  }
}