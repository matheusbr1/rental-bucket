import { ITruck, ReducerAction } from 'interfaces'
import { TruckActions } from './truck.actions'

const INITIAL_STATE = {
  all: [] as ITruck[],
  current: null as null | ITruck
}

export type ITruckInitialState = typeof INITIAL_STATE

export function truckReducer (
  state: ITruckInitialState = INITIAL_STATE, 
  action: ReducerAction
): ITruckInitialState {
  switch (action.type) {
    case TruckActions.SET_TRUCKS:
      return {
        ...state,
        all: action.payload
      } 
      
    case TruckActions.CREATE_TRUCK:
      return {
        ...state,
        all: state.all.concat({
          id: state.all.length + 1,
          ...action.payload
        })
      } 

    case TruckActions.DELETE_TRUCK:
      return {
        current: null,
        all: state.all.filter(truck => truck.id !== action.payload)
      }

    case TruckActions.SET_CURRENT_TRUCK:
      return {
        ...state,
        current: action.payload
      }

      case TruckActions.SET_TRUCK_BRAND:
        return {
          ...state,
          current: {
            ...state.current,
            brand: action.payload
          } as ITruck
        }

      case TruckActions.SET_TRUCK_MODEL:
        return {
          ...state,
          current: {
            ...state.current,
            model: action.payload
          } as ITruck
        }

    default:
      return state
  }
}