import { SET_ADDRESS, SET_CART_NUM, SET_SHOP_DATA } from '../constants'

const defaultState = {
  shopData: '',
  cartNum: 0,
  address: {}
}

export type ShopState = typeof defaultState

function shopReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SHOP_DATA:
      return {
        ...state,
        shopData: action.payload
      }
    case SET_CART_NUM:
      return {
        ...state,
        cartNum: action.payload
      }
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      }
    default:
      return state
  }
}

export default shopReducer
