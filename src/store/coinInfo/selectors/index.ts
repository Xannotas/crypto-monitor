import { TRootState } from './../../index';

export const coinInfoSelector = (state: TRootState) => state.coinInfo.coinInfo
export const isFetchingSelector = (state: TRootState) => state.coinInfo.isFetching
export const targetCoinCodeSelector = (state: TRootState) => state.coinInfo.targetCoinCode
export const errorSelector = (state: TRootState) => state.coinInfo._error

export const isHistoryFetchingSelector = (state: TRootState) => state.coinInfo.isHistoryFetching
export const historyErrorSelector = (state: TRootState) => state.coinInfo._historyError
export const coinHistorySelector = (state: TRootState) => state.coinInfo.coinHistory
export const historyModeSelector = (state: TRootState) => state.coinInfo.historyMode