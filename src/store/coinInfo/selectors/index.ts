import { TRootState } from './../../index';

export const coinInfoSelector = (state: TRootState) => state.coinInfo.coinInfo
export const isFetchingSelector = (state: TRootState) => state.coinInfo.isFetching
export const targetCoinCodeSelector = (state: TRootState) => state.coinInfo.targetCoinCode