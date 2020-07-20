import { LOGIN_IN, LOGIN_OUT, SET_SHOP_ID } from '../constants'

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

export const setShop = (shopId: number) => {
  return {
    type: SET_SHOP_ID,
    payload: shopId
  }
}
