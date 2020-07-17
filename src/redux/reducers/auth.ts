import { LOGIN_IN, LOGIN_OUT } from '../constants'

const defaultState = {
  loginStatus: false,
  userData: {
    imgurl: '',
    nickname: '',
    sex: '',
    birthdaystr: '',
    email: '',
    userwork: '',
    mobile: ''
  }
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
      case LOGIN_OUT:
      return {
        ...state,
        loginStatus: false,
        userData: {}
      }
    default:
      return state
  }
}

export default authReducer
