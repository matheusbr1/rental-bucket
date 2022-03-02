import { combineReducers } from 'redux'
import { truckReducer, workReducer, customerReducer, driverReducer } from './reducer'

const reducers = combineReducers({
  customer: customerReducer,
  driver: driverReducer,
  truck: truckReducer,
  work: workReducer
})

export { reducers }