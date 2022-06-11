import { IDriver, ReducerAction } from 'interfaces'
import { DriverActions } from './driver.actions'

const INITIAL_STATE = {
  all: [] as IDriver[],
  current: null as null | IDriver
}

export type IDriverInitialState = typeof INITIAL_STATE

export function driverReducer (
  state: IDriverInitialState = INITIAL_STATE, 
  action: ReducerAction
): IDriverInitialState {
  switch (action.type) {
    case DriverActions.SET_DRIVERS:
      return {
        ...state,
        all: action.payload
      } 
      
    case DriverActions.CREATE_DRIVER: 
      return {
        ...state,
        all: state.all.concat({
          id: state.all.length + 1,
          ...action.payload
        })
      } 

    case DriverActions.DELETE_DRIVER:
      return {
        current: null,
        all: state.all.filter(driver => driver.id !== action.payload)
      }

    case DriverActions.SET_CURRENT_DRIVER:
      return {
        ...state,
        current: action.payload
      }

    default:
      return state
  }
}