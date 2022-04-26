import { ITruck, ReducerAction } from 'interfaces'
import { TruckActions } from './truck.actions'

export type ITruckInitialState = ITruck[]

export function truckReducer (
  state: ITruckInitialState = [], 
  action: ReducerAction
): ITruckInitialState {
  switch (action.type) {
    case TruckActions.SET_TRUCKS:
      return action.payload

    case TruckActions.CREATE_TRUCK: 
      return state.concat({
        id: state.length + 1,
        ...action.payload
      })

    case TruckActions.RESET_STATE:
      return state

    default:
      return state
  }
}