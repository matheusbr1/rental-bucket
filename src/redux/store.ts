import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { customerReducer } from './customer/customer.reducer'
import { driverReducer } from './driver/driver.reducer'
import { truckReducer } from './truck/truck.reducer'
import { workReducer } from './work/work.reducer'

const reducers = combineReducers({
  customer: customerReducer,
  driver: driverReducer,
  truck: truckReducer,
  work: workReducer
})

export { reducers }

const store = createStore(
  reducers,
  {},
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export { store }