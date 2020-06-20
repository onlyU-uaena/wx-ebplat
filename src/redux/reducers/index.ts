import { combineReducers } from 'redux'

const defaultState = {
  toLocale: 'English',
}

function myReducer(state = defaultState, action) {
  return state
}

const rootReducer = combineReducers({
  myReducer
})

export default rootReducer
