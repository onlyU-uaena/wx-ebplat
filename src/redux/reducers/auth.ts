import { LOGIN_IN } from '../constants'
import { Action } from 'redux'

const defaultState = {
  loginStatus: false,
}

export type AuthState = typeof defaultState

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_IN:
      return {
        ...state,
        loginStatus: true,
        userData: action.payload
      }
    default:
      return state
  }
}

export default authReducer
