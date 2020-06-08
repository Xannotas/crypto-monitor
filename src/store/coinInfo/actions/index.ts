import { currencies, imagesUrlServer } from './../../../constants';
import { TRootState } from './../../index';
import { TCoinCode, TCoinFullInfo } from './../../../types';
import { Dispatch } from 'redux';

import api from '../../../api';

const COIN_LOAD_REQUEST = 'COIN/LOAD:REQUEST'
const COIN_LOAD_SUCCESS = 'COIN/LOAD:SUCCESS'
const COIN_LOAD_FAILURE = 'COIN/LOAD:FAILURE'

type TGetCoinInfoRequest = { type: typeof COIN_LOAD_REQUEST }
const getCoinInfoRequest = (): TGetCoinInfoRequest => ({
  type: COIN_LOAD_REQUEST
})

type TGetCoinInfoSuccess = { type: typeof COIN_LOAD_SUCCESS, payload: TCoinFullInfo }
const getCoinInfoSuccess = (payload: TCoinFullInfo): TGetCoinInfoSuccess => ({
  type: COIN_LOAD_SUCCESS,
  payload
})

type TGetCoinInfoFailure = { type: typeof COIN_LOAD_FAILURE, payload: string }
const getCoinInfoFailure = (payload: string): TGetCoinInfoFailure => ({
  type: COIN_LOAD_FAILURE,
  payload
})

export type TActions = TGetCoinInfoRequest | TGetCoinInfoSuccess | TGetCoinInfoFailure


export const getCoinInfo = (coinCode: TCoinCode) => async (dispatch: Dispatch, getState: () => TRootState) => {
  dispatch(getCoinInfoRequest())
  try {
    const targetCoinCode : TCoinCode= getState().coinInfo.targetCoinCode
    const response = await api.coinInfo.getCoinInfo(coinCode,targetCoinCode)
    const raw = response.RAW[coinCode][targetCoinCode]
    
    if (response.Response !== 'Error') {
      const data: TCoinFullInfo = {
        name: coinCode,
        fullName: currencies[coinCode],
        price: raw.PRICE,
        mktcap: raw.MKTCAP,
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