import { IState, ReducerAction } from 'interfaces'
import { Actions } from './actions'
import { INITIAL_STATE } from './state'

export function reducer (state: IState, action: ReducerAction): IState {
  console.log(action)
  
  switch (action.type) {
    case Actions.SET_WORKS:
      return {
        ...state,
        works: action.payload
      }

    case Actions.CREATE_WORK:
      return {
        ...state,
        works: state.works.concat({
          id: state.works.length + 1,
          ...action.payload
        })
      }

    case Actions.SET_TRUCKS:
      return {
        ...state,
        trucks: action.payload
      }

    case Actions.CREATE_TRUCK: 
      return {
        ...state,
        trucks: state.trucks.concat({
          id: state.trucks.length + 1,
          ...action.payload
        })
      }

    case Actions.SET_DRIVERS:
      return {
        ...state,
        drivers: action.payload
      }
      
    case Actions.CREATE_DRIVER: 
      return {
        ...state,
        drivers: state.drivers.concat({
          id: state.drivers.length + 1,
          ...action.payload
        })
      }

    case Actions.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      }

    case Actions.CREATE_CUSTOMER: 
      return {
        ...state,
        customers: state.customers.concat({
          id: state.customers.length + 1,
          ...action.payload
        })
      }

    case Actions.RESET_STATE:
      return INITIAL_STATE

    default:
      return state
  }
}