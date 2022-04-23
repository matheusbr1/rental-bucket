import { ISignInFields } from "interfaces";
import { Cookies } from 'react-cookie'

export enum UserActions {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export function signIn (user: ISignInFields, token: string) {
  const cookies = new Cookies()
  cookies.set('rentalbucket.token', token)

  return { type: UserActions.SIGN_IN, payload: user }
}

export function signOut () {
  const cookies = new Cookies()
  cookies.remove('rentalbucket.token')

  return { type: UserActions.SIGN_OUT }
}