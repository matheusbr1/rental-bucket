import { IWork, ReducerAction } from 'interfaces'
import { WorkActions } from './work.actions'

const INITIAL_STATE = {
  all: [] as IWork[],
  current: null
}

export type IWorkInitialState = typeof INITIAL_STATE

export function workReducer (
  state: IWorkInitialState =INITIAL_STATE, 
  action: ReducerAction
): IWorkInitialState {
  switch (action.type) {
    case WorkActions.SET_WORKS:
      return {
        ...state,
        all: action.payload
      }

    case  WorkActions.CREATE_WORK:
      return {
        ...state,
        all: state.all.concat({
          id: state.all.length + 1,
          ...action.payload,
        })
      }

      case WorkActions.DELETE_WORK:
        return {
          current: null,
          all: state.all.filter(work => work.id !== action.payload)
        }

    default:
      return state
  }
}