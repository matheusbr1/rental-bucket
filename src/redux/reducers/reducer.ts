import { ReducerAction } from 'interfaces'
import { CustomerActions, DriverActions, TruckActions, WorkActions } from '../constants/actionTypes'

import {  
  drivers as mockedDrivers,  
  trucks as mockedTrucks, 
  works as mockedWorks, 
  customers as mockedCustomers 
} from 'mocks'

const initialTruckState = {
  trucks: mockedTrucks
}

type ITruckInitialState = typeof initialTruckState

export function truckReducer (
  state: ITruckInitialState = initialTruckState, 
  action: ReducerAction
): ITruckInitialState {
  switch (action.type) {
    case TruckActions.SET_TRUCKS:
      return { ...state, trucks: action.payload }

    case TruckActions.CREATE_TRUCK: 
      return {
        ...state,
        trucks: state.trucks.concat({
          id: state.trucks.length + 1,
          ...action.payload
        })
      }

    case TruckActions.RESET_STATE:
      return state

    default:
      return state
  }
}

const initialWorkState = {
  works: mockedWorks
}

type IWorkInitialState = typeof initialWorkState

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
          endDate: new Date(),
        })
      }

    case TruckActions.RESET_STATE:
      return state

    default:
      return state
  }
}

const initialDriverState = {
  drivers: mockedDrivers
}

type IDriverInitialState = typeof initialDriverState

export function driverReducer (
  state: IDriverInitialState = initialDriverState, 
  action: ReducerAction
): IDriverInitialState {
  switch (action.type) {
    case DriverActions.SET_DRIVERS:
      return {
        ...state,
        drivers: action.payload
      }
      
    case DriverActions.CREATE_DRIVER: 
      return {
        ...state,
        drivers: state.drivers.concat({
          id: state.drivers.length + 1,
          ...action.payload
        })
      }

    case TruckActions.RESET_STATE:
      return state

    default:
      return state
  }
}

const initialCustomerState = {
  customers: mockedCustomers
}

type ICustomerInitialState = typeof initialCustomerState

export function customerReducer (
  state: ICustomerInitialState = initialCustomerState, 
  action: ReducerAction
): ICustomerInitialState {
  switch (action.type) {
    case CustomerActions.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      }

    case CustomerActions.CREATE_CUSTOMER: 
      return {
        ...state,
        customers: state.customers.concat({
          id: state.customers.length + 1,
          ...action.payload
        })
      }

    case TruckActions.RESET_STATE:
      return state

    default:
      return state
  }
}