import { ISignInFields } from "interfaces";

export enum UserActions {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export function signIn (user: ISignInFields) {
  return { type: UserActions.SIGN_IN, payload: user }
}

export function signOut () {
  return { type: UserActions.SIGN_OUT }
}