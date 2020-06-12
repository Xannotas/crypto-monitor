import { currencies, imagesUrlServer } from '../../../utils/constants';
import { TRootState } from './../../index';
import { TCoinCode, TCoinFullInfo, TCoinHistroryDataElement, TCoinHistoryMode } from '../../../utils/types';
import { Dispatch } from 'redux';
import fromUnixTime from 'date-fns/fromUnixTime'
import formatDate from 'date-fns/format'

import api from '../../../api';

const COIN_INFO_LOAD_REQUEST = 'COIN_INFO/LOAD:REQUEST'
const COIN_INFO_LOAD_SUCCESS = 'COIN_INFO/LOAD:SUCCESS'
const COIN_INFO_LOAD_FAILURE = 'COIN_INFO/LOAD:FAILURE'
const COIN_INFO_RESET = 'COIN_INFO/RESET'

const COIN_HISTORY_REQUEST = 'COIN_HISTORY/LOAD:REQUEST'
const COIN_HISTORY_SUCCESS = 'COIN_HISTORY/LOAD:SUCCESS'
const COIN_HISTORY_FAILURE = 'COIN_HISTORY/LOAD:FAILURE'

const COIN_HISTORY_CHANGE_MODE = 'COIN_HISTORY/MODE:CHANGE'

/*
  COIN INFO
*/
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

/*
  COIN HISTORY
*/
type TGetCoinHistoryRequest = { type: typeof COIN_HISTORY_REQUEST }
const getCoinHistoryRequest = (): TGetCoinHistoryRequest => ({
  type: COIN_HISTORY_REQUEST
})

type TGetCoinHistorySuccess = { type: typeof COIN_HISTORY_SUCCESS, payload: TCoinHistroryDataElement[] }
const getCoinHistorySuccess = (payload: TCoinHistroryDataElement[]): TGetCoinHistorySuccess => ({
  type: COIN_HISTORY_SUCCESS,
  payload
})

type TGetCoinHistoryFailure = { type: typeof COIN_HISTORY_FAILURE, payload: string }
const getCoinHistoryFailure = (payload: string): TGetCoinHistoryFailure => ({
  type: COIN_HISTORY_FAILURE,
  payload
})

type TChangeHistoryMode = {type: typeof COIN_HISTORY_CHANGE_MODE, payload: TCoinHistoryMode}
export const changeHistoryMode = (payload: TCoinHistoryMode): TChangeHistoryMode => ({
  type: COIN_HISTORY_CHANGE_MODE,
  payload
})

export type TActions = TGetCoinInfoRequest | TGetCoinInfoSuccess | TGetCoinInfoFailure | TResetCoinInfo |
  TGetCoinHistoryFailure | TGetCoinHistorySuccess | TGetCoinHistoryRequest | TChangeHistoryMode

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
        directVol: raw.VOLUME24HOUR,
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

export const getCoinHistory = (coinCode: TCoinCode) => async (dispatch: Dispatch, getState: () => TRootState) => {
  dispatch(getCoinHistoryRequest())
  try {
    const targetCoinCode: TCoinCode = getState().coinInfo.targetCoinCode
    const historyMode = getState().coinInfo.historyMode
    const response: any = await api.coinInfo.getCoinHistoryData(coinCode, targetCoinCode, historyMode)
    const data: any[] = response.data.Data.Data

    if (response.Response !== 'Error') {
      const history: TCoinHistroryDataElement[] = data.map((row: any) => ({
        title: formatDate(fromUnixTime(row.time), formatPattern[historyMode] || 'dd.MM.yyyy HH:mm'),
        price: row.open
      }))

      dispatch(getCoinHistorySuccess(history))
    } else {
      dispatch(getCoinHistoryFailure('err'))
    }

  } catch (e) {
    dispatch(getCoinHistoryFailure(e))
  }
}

const formatPattern = {
  '1h': 'HH:mm',
  '1d': 'HH:mm',
  '3d': 'dd.MM HH:mm',
  '1w': 'dd.MM HH:mm',
  '1m': 'dd.MM.yyyy',
  '3m': 'dd.MM.yyyy',
  '6m': 'dd.MM.yyyy',
  '1y': 'dd.MM.yyyy',
  '3y': 'dd.MM.yyyy'
}