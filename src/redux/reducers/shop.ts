import { SET_SHOP_ID } from '../constants'

const defaultState = {
  shopId: ''
}

export type ShopState = typeof defaultState

function shopReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SHOP_ID:
      return {
        ...state,
        shopId: action.payload
      }
    default:
      return state
  }
}

export default shopReducer
