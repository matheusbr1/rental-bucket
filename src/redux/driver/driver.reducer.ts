import { ReducerAction } from 'interfaces'
import { DriverActions } from './driver.actions'

const initialDriverState = {
  drivers: []
}

type IDriverInitialState = typeof initialDriverState

export function driverReducer (
  state: IDriverInitialState = initialDriverState, 
  action: ReducerAction
): IDriverInitialState {
  switch (action.type) {
    case DriverActions.SET_DRIVERS:
      return {
        ...state,
        drivers: action.payload
      }
      
    case DriverActions.CREATE_DRIVER: 
      return {
        ...state,
        drivers: state.drivers.concat({
          id: state.drivers.length + 1,
          ...action.payload
        })
      }

    case DriverActions.RESET_STATE:
      return state

    default:
      return state
  }
}