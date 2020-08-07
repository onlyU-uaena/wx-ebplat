import { LOGIN_IN, LOGIN_OUT, SET_ADDRESS, SET_CART_NUM, SET_SHOP_DATA } from '../constants'

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

export const setShop = (shopData) => {
  return {
    type: SET_SHOP_DATA,
    payload: shopData
  }
}

export const setAddress = (address) => {
  return {
    type: SET_ADDRESS,
    payload: address
  }
}

export const setCartNum = (num) => {
  return {
    type: SET_CART_NUM,
    payload: num
  }
}
