import { RootState } from './index'
import { AuthState } from './auth'

type Selector<T> = (state: RootState) => T

export const selectAuthState: Selector<AuthState> = (state) => state.authState
