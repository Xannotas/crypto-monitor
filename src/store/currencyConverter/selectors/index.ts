import { TRootState } from '../..'

export const priceSelector = (state: TRootState) => state.currencyConverter.price
export const isFetchingSelector = (state: TRootState) => state.currencyConverter.isFetching