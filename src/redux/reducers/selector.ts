import { RootState } from './index'
import { AuthState } from './auth'
import { ShopState } from '@redux/reducers/shop'

type Selector<T> = (state: RootState) => T

export const selectAuthState: Selector<AuthState> = (state) => state.authState
export const selectShopState: Selector<ShopState> = (state) => state.shopState
