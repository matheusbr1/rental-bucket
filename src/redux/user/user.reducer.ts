import { ReducerAction } from 'interfaces'
import { UserActions } from './user.actions'

const persistedState = sessionStorage.getItem('@rentalbucket:user')

const initialUserState = persistedState ? JSON.parse(persistedState) : {
  data: {
    name: '',
    email: ''
  },
  isAuthenticated: false
}

export type IUserInitialState = typeof initialUserState

export function userReducer (
  state: IUserInitialState = initialUserState, 
  action: ReducerAction
): IUserInitialState {
  switch (action.type) {
    case UserActions.SIGN_IN:
      const updatedState = { 
        data: action.payload,
        isAuthenticated: true
      }

      sessionStorage.setItem('@rentalbucket:user', JSON.stringify(updatedState))

      return updatedState

    case UserActions.SIGN_OUT: 
      sessionStorage.removeItem('@rentalbucket:user')

      return {
        data: {
          name: '',
          email: ''
        },
        isAuthenticated: false
      }
   
    default:
      return state
  }
}