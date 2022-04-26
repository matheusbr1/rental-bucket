import { IDriver, ReducerAction } from 'interfaces'
import { DriverActions } from './driver.actions'

export type IDriverInitialState = IDriver[]

export function driverReducer (
  state: IDriverInitialState = [], 
  action: ReducerAction
): IDriverInitialState {
  switch (action.type) {
    case DriverActions.SET_DRIVERS:
      return action.payload
      
    case DriverActions.CREATE_DRIVER: 
      return state.concat({
        id: state.length + 1,
        ...action.payload
      })

    default:
      return state
  }
}