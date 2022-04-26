import { IWork, ReducerAction } from 'interfaces'
import { WorkActions } from './work.actions'

export type IWorkInitialState = IWork[]

export function workReducer (
  state: IWorkInitialState = [], 
  action: ReducerAction
): IWorkInitialState {
  switch (action.type) {
    case WorkActions.SET_WORKS:
      return action.payload

    case WorkActions.CREATE_WORK:
      return state.concat({
        id: state.length + 1,
        ...action.payload,
      })

    default:
      return state
  }
}