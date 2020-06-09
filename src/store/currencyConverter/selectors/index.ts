import { TRootState } from '../..'

export const priceSelector = (state: TRootState) => state.currencyConverter.price
export const isFetchingSelector = (state: TRootState) => state.currencyConverter.isFetching
export const currencyCodeSelector = (state: TRootState) => state.currencyConverter.currencyCode
export const currencyTargetCodeSelector = (state: TRootState) => state.currencyConverter.currencyTargetCode