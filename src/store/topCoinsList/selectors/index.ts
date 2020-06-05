import { TReducerState } from '../reducers'

export const coinsSelector = (state: TReducerState) => state.coins
export const isFetchingSelector = (state: TReducerState) => state.isFetching