import { HAVE_MESSAGE, LOGIN_IN, LOGIN_OUT, NO_MESSAGE } from '../constants'

const defaultState = {
  loginStatus: false,
  haveMessage: false,
  userData: {
    imgurl: '',
    id: 0,
    nickname: '',
    sex: 1,
    birthdaystr: '',
    email: '',
    userwork: '',
    mobile: '',
    points: ''
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
    case HAVE_MESSAGE:
      return {
        ...state,
        haveMessage: true
      }
    case NO_MESSAGE:
      return {
        ...state,
        haveMessage: false
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
