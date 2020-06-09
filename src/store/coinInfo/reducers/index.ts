import { TActions } from './../actions';
import { TCoinFullInfo, TCoinCode } from './../../../types';

const initialState = {
  coinInfo: {} as TCoinFullInfo,
  targetCoinCode: 'USD' as TCoinCode,

  isFetching: false as boolean,
  _error: '' as string
}

export type TReducerState = typeof initialState

const CoinInfoReducer = (state = initialState, action: TActions): TReducerState => {
  switch (action.type) {
    case 'COIN_INFO/LOAD:SUCCESS' : return {
      ...state,
      coinInfo: action.payload,
      isFetching: false,
      _error: ''
    }

    case 'COIN_INFO/LOAD:FAILURE' : return {
      ...state,
      isFetching: false,
      _error: action.payload
    }

    case 'COIN_INFO/LOAD:REQUEST' : return {
      ...state,
      isFetching: true
    }

    case 'COIN_INFO/RESET' : return {
      ...state,
      coinInfo: {} as TCoinFullInfo
    }

    default: return state
  }
}

export default CoinInfoReducer