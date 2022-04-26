import { IWork } from "interfaces";

export enum WorkActions {
  SET_WORKS = 'SET_WORKS',
  CREATE_WORK = 'CREATE_WORK',
}

export function setWorks(works: IWork[]) {
  return { type: WorkActions.SET_WORKS, payload: works }
}

export function createWork(work: IWork) {
  return { type: WorkActions.CREATE_WORK, payload: work }
}