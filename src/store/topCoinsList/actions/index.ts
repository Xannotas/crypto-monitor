import { TRootState } from './../../index';
import { imagesUrlServer } from './../../../constants';
import { TCoinInfo } from './../../../types';
import { Dispatch } from 'redux'
import api from '../../../api'

const GET_COINS_REQUEST = 'TOP_COINS/GET_COINS:REQUEST'
const GET_COINS_SUCCESS = 'TOP_COINS/GET_COINS:SUCCESS'
const GET_COINS_FAILURE = 'TOP_COINS/GET_COINS:FAILURE'

export type TActions = TGetCoinsRequest | TGetCoinsSuccess | TGetCoinsFailure

type TGetCoinsRequest = { type: typeof GET_COINS_REQUEST }
const getCoinsRequest = (): TGetCoinsRequest => ({
  type: GET_COINS_REQUEST
})

type TGetCoinsFailure = { type: typeof GET_COINS_FAILURE, payload: string }
const getCoinsFailure = (error: string): TGetCoinsFailure => ({
  type: GET_COINS_FAILURE,
  payload: error
})

type TGetCoinsSuccess = { type: typeof GET_COINS_SUCCESS, payload: TCoinInfo[] }
const getCoinsSuccess = (payload: TCoinInfo[]): TGetCoinsSuccess => ({
  type: GET_COINS_SUCCESS,
  payload
})

export const getCoins = () => async (dispatch: Dispatch, getState: ()=>TRootState) => {
  dispatch(getCoinsRequest())

  try {
    const targetCoinCode = getState().coinInfo.targetCoinCode
    const limit = 10

    const response: any = await api.toplists.getTopListByTierVolume(limit, targetCoinCode)
    const data = response.data
    const resCoins: any[] = data.Data

    if (data.Message === 'Success') {
      const coins: TCoinInfo[] = resCoins.map(coin => ({
        code: coin.CoinInfo.Name,
        name: coin.CoinInfo.FullName,
        price: coin.DISPLAY.USD.PRICE,
        directVol: coin.DISPLAY.USD.VOLUME24HOURTO.replace(/[,]/gi, ' ').split('.')[0],
        totalVol: coin.DISPLAY.USD.TOTALVOLUME24HTO,
        mktcap: coin.DISPLAY.USD.MKTCAP,
        imageUrl: imagesUrlServer + coin.CoinInfo.ImageUrl
      }))

      dispatch(getCoinsSuccess(coins))
    } else {
      dispatch(getCoinsFailure('Cannot load data from server.'))
    }
  } catch (e) {
    dispatch(getCoinsFailure(e))
  }
}

