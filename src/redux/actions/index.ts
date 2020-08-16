import {
  HAVE_MESSAGE,
  LOGIN_IN,
  LOGIN_OUT, NO_MESSAGE,
  REFRESH_COMPLETE,
  SET_ADDRESS,
  SET_CART_NUM,
  SET_SHOP_DATA
} from '../constants'

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

export const setShop = (shopData, needToRefresh) => {
  return {
    type: SET_SHOP_DATA,
    payload: {shopData, needToRefresh}
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

export const refreshComplete = () => {
  return {
    type: REFRESH_COMPLETE
  }
}

export const setMessage = () => {
  return {
    type: HAVE_MESSAGE
  }
}

export const setNoMessage = () => {
  return {
    type: NO_MESSAGE
  }
}
