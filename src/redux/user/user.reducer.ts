import { ReducerAction } from 'interfaces'
import { UserActions } from './user.actions'

const persistedState = sessionStorage.getItem('@rentalbucket:user')

const initialState = {
  data: {
    name: '',
    email: '',
    avatar: ''
  },
  isAuthenticated: false
}

const initialUserState = persistedState 
  ? JSON.parse(persistedState) 
  : initialState

export type IUserInitialState = typeof initialState

export function userReducer (
  state: IUserInitialState = initialUserState, 
  action: ReducerAction
): IUserInitialState {
  switch (action.type) {
    case UserActions.SIGN_IN:
      const updatedState = {
        isAuthenticated: true,
        data: action.payload
      }

      sessionStorage.setItem('@rentalbucket:user', JSON.stringify(updatedState))

      return updatedState

    case UserActions.SIGN_OUT: 
      sessionStorage.removeItem('@rentalbucket:user')
      return initialState

    case UserActions.UPDATE_USER_AVATAR:
      return {
        ...state,
        data: {
          ...state.data,
          avatar: action.payload
        }
      }
   
    default:
      return state
  }
}