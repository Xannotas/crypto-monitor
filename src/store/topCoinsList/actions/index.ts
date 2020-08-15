import { TCoinCode } from './../../../utils/types';
import { TRootState } from './../../index';
import { imagesUrlServer } from '../../../utils/constants';
import { TCoinInfo } from '../../../utils/types';
import { Dispatch } from 'redux'
import api from '../../../api'

const GET_COINS_REQUEST = 'TOP_COINS/GET_COINS:REQUEST'
const GET_COINS_SUCCESS = 'TOP_COINS/GET_COINS:SUCCESS'
const GET_COINS_FAILURE = 'TOP_COINS/GET_COINS:FAILURE'

const CHANGE_PAGE_NUMBER = 'TOP_COINS/PAGE_NUMBER:CHANGE'
const RESET_LIST = 'TOP_COINS/LIST:RESET'
const CHANGE_COIN_PRICE = 'TOP_COINS/COIN_PRICE:CHANGE'

export type TActions = TGetCoinsRequest | TGetCoinsSuccess | TGetCoinsFailure | TChangePageNumber | TResetCoinsList | TChangeCoinPrice

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

type TChangePageNumber = { type: typeof CHANGE_PAGE_NUMBER, payload: number }
export const changePageNumber = (payload: number): TChangePageNumber => ({
  type: CHANGE_PAGE_NUMBER,
  payload
})

type TResetCoinsList = { type: typeof RESET_LIST }
export const resetCoinsList = (): TResetCoinsList => ({
  type: RESET_LIST
})

type TChangeCoinPrice = { type: typeof CHANGE_COIN_PRICE, payload: { coinCode: TCoinCode, price: number } }
export const changeCoinPrice = (payload: { coinCode: TCoinCode, price: number }): TChangeCoinPrice => ({
  type: CHANGE_COIN_PRICE,
  payload
})

export const getCoins = (limit: number = 10) => async (dispatch: Dispatch, getState: () => TRootState) => {
  dispatch(getCoinsRequest())

  try {
    const targetCoinCode: TCoinCode = getState().coinInfo.targetCoinCode
    const pageNumber: number = getState().topCoinsList.pageNumber

    const response: any = await api.toplists.getTopListByTierVolume(limit, targetCoinCode, pageNumber)
    const data = response.data
    const resCoins: any[] = data.Data

    if (data.Message === 'Success') {
      const coins: TCoinInfo[] = resCoins.map(coin => ({
        code: coin.CoinInfo.Name,
        name: coin.CoinInfo.FullName,
        price: coin.RAW[targetCoinCode].PRICE,
        directVol: coin.RAW[targetCoinCode].VOLUME24HOURTO,
        totalVol: coin.DISPLAY[targetCoinCode].TOTALVOLUME24HTO,
        mktcap: coin.DISPLAY[targetCoinCode].MKTCAP,
        imageUrl: imagesUrlServer + coin.CoinInfo.ImageUrl,
        toSymbol: coin.DISPLAY[targetCoinCode].TOSYMBOL
      }))

      dispatch(getCoinsSuccess(coins))
    } else {
      dispatch(getCoinsFailure('Cannot load data from server.'))
    }
  } catch (e) {
    dispatch(getCoinsFailure(e.message))
  }
}

