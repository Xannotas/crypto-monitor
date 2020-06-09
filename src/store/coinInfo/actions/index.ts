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
    const targetCoinCode : TCoinCode= getState().coinInfo.targetCoinCode
    const response = await api.coinInfo.getCoinInfo(coinCode,targetCoinCode)
    const raw = response.RAW[coinCode][targetCoinCode]
    
    if (response.Response !== 'Error') {
      const data: TCoinFullInfo = {
        code: coinCode,
        name: currencies[coinCode],
        price: raw.PRICE,
        mktcap: raw.MKTCAP,
        directVol: raw.VOLUME24HOURTO,
        totalVol: raw.TOTALVOLUME24HTO,
        imageUrl: imagesUrlServer + raw.IMAGEURL,
      }
      dispatch(getCoinInfoSuccess(data))
    } else {
      getCoinInfoFailure('err')
    }

  } catch (e) {
    getCoinInfoFailure(e)
  }
}