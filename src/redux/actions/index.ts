import { LOGIN_IN, LOGIN_OUT } from '../constants'

export const loginIn = (userLogin: object) => {
  return {
    type: LOGIN_IN,
    payload: userLogin
  }
}

export const loginOut = () => {
  return {
    type: LOGIN_OUT
  }
}
