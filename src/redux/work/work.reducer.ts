import { ReducerAction } from 'interfaces'
import { WorkActions } from './work.actions'

const initialWorkState = {
  works: []
}

export type IWorkInitialState = typeof initialWorkState

export function workReducer (
  state: IWorkInitialState = initialWorkState, 
  action: ReducerAction
): IWorkInitialState {
  switch (action.type) {
    case WorkActions.SET_WORKS:
      return { ...state, works: action.payload }

    case WorkActions.CREATE_WORK:
      return {
        ...state,
        works: state.works.concat({
          id: state.works.length + 1,
          ...action.payload,
        })
      }

    case WorkActions.RESET_STATE:
      return state

    default:
      return state
  }
}