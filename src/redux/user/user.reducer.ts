import { ReducerAction } from 'interfaces'
import { UserActions } from './user.actions'

const initialUserState = {
  user: {
    name: '',
    email: ''
  },
  isAuthenticated: false
}

type IUserInitialState = typeof initialUserState

export function truckReducer (
  state: IUserInitialState = initialUserState, 
  action: ReducerAction
): IUserInitialState {
  switch (action.type) {
    case UserActions.SIGN_IN:
      return { 
        user: action.payload,
        isAuthenticated: true
      }

    case UserActions.SIGN_OUT: 
      return initialUserState
   
    default:
      return state
  }
}