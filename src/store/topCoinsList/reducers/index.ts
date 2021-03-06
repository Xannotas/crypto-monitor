import { TActions } from '../actions';
import { TCoinInfo } from '../../../utils/types';

const initialState = {
  coins: [] as TCoinInfo[],
  isFetching: false as boolean,
  _error: '' as string
}

export type TReducerState = typeof initialState

const topCoinsReducer = (state = initialState, action: TActions): TReducerState => {
  switch (action.type) {
    case 'TOP_COINS/GET_COINS:SUCCESS': {
      return {
        ...state,
        isFetching: false,
        coins: action.payload,
        _error: ''
      }
    }

    case 'TOP_COINS/GET_COINS:FAILURE': {
      return {
        ...state,
        isFetching: false,
        _error: action.payload
      }
    }

    case 'TOP_COINS/GET_COINS:REQUEST': {
      return {
        ...state,
        isFetching: true,
        _error: ''
      }
    }

    case 'TOP_COINS/LIST:RESET': {
      return {
        ...state,
        coins: [],
        _error: ''
      }
    }

    case 'TOP_COINS/COIN_PRICE:CHANGE': {
      return {
        ...state,
        coins: state.coins.map(coin => coin.code === action.payload.coinCode ? {
          ...coin,
          price: action.payload.price,
          priceDirection: action.payload.price - Number(coin.price),
          lastPriceUpdate: new Date().getTime()
        } : coin)
      }
    }

    default: return state
  }
}

export default topCoinsReducer