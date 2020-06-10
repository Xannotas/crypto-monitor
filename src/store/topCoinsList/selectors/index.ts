import { TRootState } from '../..'

export const coinsSelector = (state: TRootState) => state.topCoinsList.coins
export const isFetchingSelector = (state: TRootState) => state.topCoinsList.isFetching
export const errorSelector = (state: TRootState) => state.topCoinsList._error