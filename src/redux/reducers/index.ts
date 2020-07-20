import { combineReducers } from 'redux'
import authReducer from './auth'
import shopReducer from '@redux/reducers/shop'

const rootReducer = combineReducers({
  authState: authReducer,
  shopState: shopReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
