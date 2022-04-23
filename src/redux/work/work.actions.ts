import { IWork } from "interfaces";

export enum WorkActions {
  RESET_STATE = 'RESET_STATE',
  SET_WORKS = 'SET_WORKS',
  CREATE_WORK = 'CREATE_WORK',
}

export function createWork(work: IWork) {
  return { type: WorkActions.CREATE_WORK, payload: work }
}