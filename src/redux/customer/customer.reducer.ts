import { ICustomer, ReducerAction } from 'interfaces'
import { CustomerActions } from './customer.actions'

const INITIAL_STATE = {
  all: [] as ICustomer[],
  current: null as null | ICustomer
}

export type ICustomerInitialState = typeof INITIAL_STATE

export function customerReducer (
  state: ICustomerInitialState = INITIAL_STATE, 
  action: ReducerAction
): ICustomerInitialState {
  switch (action.type) {
    case CustomerActions.SET_CUSTOMERS:
      return {
        ...state,
        all: action.payload
      }

    case CustomerActions.CREATE_CUSTOMER: 
      return {
        ...state,
        all: state.all.concat({
          id: state.all.length + 1,
          ...action.payload
        })
      } 

    case CustomerActions.DELETE_CUSTOMER:
      return {
        current: null,
        all: state.all.filter(customer => customer.id !== action.payload)
      }

    case CustomerActions.SET_CURRENT_CUSTOMER:
      return {
        ...state,
        current: action.payload
      }

    default:
      return state
  }
}