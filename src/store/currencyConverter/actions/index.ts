import { TCoinCode } from './../../../types';
import { Dispatch } from 'redux';
import api from '../../../api'

const GET_PRICE_REQUEST = 'CURRENCY_CONVERTER/GET_PRICE:REQUEST'
const GET_PRICE_SUCCESS = 'CURRENCY_CONVERTER/GET_PRICE:SUCCESS'
const GET_PRICE_FAILURE = 'CURRENCY_CONVERTER/GET_PRICE:FAILURE'

type TGetPriceRequest = { type: typeof GET_PRICE_REQUEST }
const getPriceRequest = () => ({
  type: GET_PRICE_REQUEST
})

type TGetPriceFailure = { type: typeof GET_PRICE_FAILURE, payload: string }
const getPriceFailure = (error: string) => ({
  type: GET_PRICE_FAILURE,
  payload: error
})

type TGetPriceSuccess = { type: typeof GET_PRICE_SUCCESS, payload: number }
const getPriceSuccess = (payload: number) => ({
  type: GET_PRICE_SUCCESS,
  payload
})

export type TActions = TGetPriceRequest | TGetPriceFailure | TGetPriceSuccess

export const getPrice = (currency: TCoinCode, targetCurrency: TCoinCode) => async (dispatch: Dispatch) => {
  dispatch(getPriceRequest())

  try {
    const response = await api.prices.getPrice(currency, targetCurrency)
    const data: number = response[targetCurrency]
    
    if (data) {
      dispatch(getPriceSuccess(data))
    } else {
      getPriceFailure('Cannot load data from server.')
    }
  } catch (e) {
    getPriceFailure(e)
  }
}
