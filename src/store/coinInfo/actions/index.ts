import { currencies, imagesUrlServer } from './../../../constants';
import { TRootState } from './../../index';
import { TCoinCode, TCoinFullInfo } from './../../../types';
import { Dispatch } from 'redux';

import api from '../../../api';

const COIN_INFO_LOAD_REQUEST = 'COIN_INFO/LOAD:REQUEST'
const COIN_INFO_LOAD_SUCCESS = 'COIN_INFO/LOAD:SUCCESS'
const COIN_INFO_LOAD_FAILURE = 'COIN_INFO/LOAD:FAILURE'
const COIN_INFO_RESET = 'COIN_INFO/RESET'

type TGetCoinInfoRequest = { type: typeof COIN_INFO_LOAD_REQUEST }
const getCoinInfoRequest = (): TGetCoinInfoRequest => ({
  type: COIN_INFO_LOAD_REQUEST
})

type TGetCoinInfoSuccess = { type: typeof COIN_INFO_LOAD_SUCCESS, payload: TCoinFullInfo }
const getCoinInfoSuccess = (payload: TCoinFullInfo): TGetCoinInfoSuccess => ({
  type: COIN_INFO_LOAD_SUCCESS,
  payload
})

type TGetCoinInfoFailure = { type: typeof COIN_INFO_LOAD_FAILURE, payload: string }
const getCoinInfoFailure = (payload: string): TGetCoinInfoFailure => ({
  type: COIN_INFO_LOAD_FAILURE,
  payload
})

type TResetCoinInfo = { type: typeof COIN_INFO_RESET }
export const resetCoinInfo = (): TResetCoinInfo => ({
  type: COIN_INFO_RESET
})

export type TActions = TGetCoinInfoRequest | TGetCoinInfoSuccess | TGetCoinInfoFailure | TResetCoinInfo


export const getCoinInfo = (coinCode: TCoinCode) => async (dispatch: Dispatch, getState: () => TRootState) => {
  dispatch(getCoinInfoRequest())
  try {
    const targetCoinCode: TCoinCode = getState().coinInfo.targetCoinCode
    const response: any = await api.coinInfo.getCoinInfo(coinCode, targetCoinCode)
    const data = response.data

    const raw = data.RAW[coinCode][targetCoinCode]
    const display = data.DISPLAY[coinCode][targetCoinCode]

    if (response.Response !== 'Error') {
      const data: TCoinFullInfo = {
        code: coinCode,
        name: currencies[coinCode],
        imageUrl: imagesUrlServer + raw.IMAGEURL,
        toSymbol: display.TOSYMBOL,
        toCode: raw.TOSYMBOL,

        price: display.PRICE,
        mktcap: raw.MKTCAP,
        supply: raw.SUPPLY,
        directVol: raw.VOLUME24HOURTO,
        totalVol: raw.TOTALVOLUME24H,

        changePercent24Hour: display.CHANGEPCT24HOUR,
        change24Hour: display.CHANGE24HOUR,
        low24Hour: raw.LOW24HOUR,
        high24Hour: raw.HIGH24HOUR,
      }
      dispatch(getCoinInfoSuccess(data))
    } else {
      dispatch(getCoinInfoFailure('err'))
    }

  } catch (e) {
    dispatch(getCoinInfoFailure(e))
  }
}