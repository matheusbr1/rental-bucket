import { ReducerAction } from 'interfaces'
import { UserActions } from './user.actions'

const persistedState = sessionStorage.getItem('@rentalbucket:user')

const initialState = {
  data: {
    name: '',
    email: '',
    avatar: 'https://lh3.googleusercontent.com/a-/AOh14GjFOW9XIzTAnRBsiQ7HHIHEDENmp0LObBXrMyeN4ac=s288-p-rw-no'
  },
  isAuthenticated: false
}

const initialUserState = persistedState ? JSON.parse(persistedState) : initialState

export type IUserInitialState = typeof initialUserState

export function userReducer (
  state: IUserInitialState = initialUserState, 
  action: ReducerAction
): IUserInitialState {
  switch (action.type) {
    case UserActions.SIGN_IN:
      const updatedState = {
        isAuthenticated: true,
        data: {
          ...state.data,
          ...action.payload
        }
      }

      sessionStorage.setItem('@rentalbucket:user', JSON.stringify(updatedState))

      return updatedState

    case UserActions.SIGN_OUT: 
      sessionStorage.removeItem('@rentalbucket:user')

      return initialState
   
    default:
      return state
  }
}