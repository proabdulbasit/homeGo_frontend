import { combineReducers } from 'redux'
import { stayReducer } from './stayReducer'
import { userReducer } from './userReducer'
import { orderReducer } from './orderReducer'
import { tripReducer } from './tripReducer'
import { systemReducer } from './systemReducer'

export const rootReducer = combineReducers({
  systemModule: systemReducer,
  orderModule: orderReducer,
  stayModule: stayReducer,
  userModule: userReducer,
  tripModule: tripReducer
})
