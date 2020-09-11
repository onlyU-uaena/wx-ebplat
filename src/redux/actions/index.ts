import {
  HAVE_MESSAGE,
  LOGIN_IN,
  LOGIN_OUT, NO_MESSAGE,
  REFRESH_COMPLETE, RESET_ADDRESS,
  SET_ADDRESS,
  SET_CART_NUM,
  SET_SHOP_DATA, SHOW_SHOP_NAME
} from '../constants'
import store from '@redux/store'
import Taro from '@tarojs/taro'

export const loginIn = (userLogin: object) => {
  return {
    type: LOGIN_IN,
    payload: userLogin
  }
}

export const loginOut = () => {
  store.dispatch(setCartNum(0))
  store.dispatch(setNoMessage())
  setTimeout(() => {
    Taro.removeTabBarBadge({
      index: 2
    })
  }, 1500)
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

export const showShopName = () => {
  return {
    type: SHOW_SHOP_NAME,
  }
}


export const setAddress = (address) => {
  return {
    type: SET_ADDRESS,
    payload: address
  }
}

export const resetAddress = () => {
  return {
    type: RESET_ADDRESS
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
