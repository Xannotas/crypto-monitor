import { TActions } from './../actions/index';
import { TCoinCode } from './../../../types';
import { } from '../actions';

const initialState = {
  currencyCode: 'BTC' as TCoinCode,
  targetCurrencyCode: 'USD' as TCoinCode,
  price: 0 as number,

  isFetching: false as boolean,
  _error: '' as string
}

export type TReducerState = typeof initialState 

const currencyConverterReducer = (state = initialState, action: TActions) : TReducerState=> {
  switch (action.type) {
    case 'CURRENCY_CONVERTER/GET_PRICE:REQUEST': {
      return {
        ...state,
        isFetching: true
      }
    }

    case 'CURRENCY_CONVERTER/GET_PRICE:FAILURE': {
      return {
        ...state,
        isFetching: true,
        _error: action.payload
      }
    }

    case 'CURRENCY_CONVERTER/GET_PRICE:SUCCESS': {
      return {
        ...state,
        isFetching: false,
        price: action.payload
      }
    }

    default: return state
  }
}

export default currencyConverterReducer