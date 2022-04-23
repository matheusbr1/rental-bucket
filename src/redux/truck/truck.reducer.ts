import { ReducerAction } from 'interfaces'
import { TruckActions } from './truck.actions'

const initialTruckState = {
  trucks: []
}

export type ITruckInitialState = typeof initialTruckState

export function truckReducer (
  state: ITruckInitialState = initialTruckState, 
  action: ReducerAction
): ITruckInitialState {
  switch (action.type) {
    case TruckActions.SET_TRUCKS:
      return { ...state, trucks: action.payload }

    case TruckActions.CREATE_TRUCK: 
      return {
        ...state,
        trucks: state.trucks.concat({
          id: state.trucks.length + 1,
          ...action.payload
        })
      }

    case TruckActions.RESET_STATE:
      return state

    default:
      return state
  }
}