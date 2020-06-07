import { imagesUrlServer } from './../../../constants';
import { TCoinInfo } from './../../../types';
import { Dispatch } from 'redux'
import api from '../../../api'

const GET_COINS_REQUEST = 'TOP_COINS/GET_COINS:REQUEST'
const GET_COINS_SUCCESS = 'TOP_COINS/GET_COINS:SUCCESS'
const GET_COINS_FAILURE = 'TOP_COINS/GET_COINS:FAILURE'

export type TActions = TGetCoinsRequest | TGetCoinsSuccess  | TGetCoinsFailure

type TGetCoinsRequest = { type: typeof GET_COINS_REQUEST }
const getCoinsRequest = () => ({
  type: GET_COINS_REQUEST
})

type TGetCoinsFailure = { type: typeof GET_COINS_FAILURE, payload: string }
const getCoinsFailure = (error: string) => ({
  type: GET_COINS_FAILURE,
  payload: error
})

type TGetCoinsSuccess = { type: typeof GET_COINS_SUCCESS, payload: TCoinInfo[] }
const getCoinsSuccess = (payload: TCoinInfo[]) => ({
  type: GET_COINS_SUCCESS,
  payload
})

export const getCoins = () => async (dispatch: Dispatch) => {
  dispatch(getCoinsRequest())

  try {
    const response = await api.toplists.getTopListByMarketCap()
    const data = response.Data as any[]

    if (response.Type === 100) {
      const coins: TCoinInfo[] = data.map(coin => ({
        name: coin.CoinInfo.Name,
        fullName: coin.CoinInfo.FullName,
        price: coin.DISPLAY.USD.PRICE,
        mktcap: coin.DISPLAY.USD.MKTCAP,
        imageUrl: imagesUrlServer + coin.CoinInfo.ImageUrl
      }))

      dispatch(getCoinsSuccess(coins))
    } else {
      getCoinsFailure('Cannot load data from server.')
    }
  } catch (e) {
    getCoinsFailure(e)
  }
}

