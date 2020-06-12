import { TActions } from './../actions';
import { TCoinFullInfo, TCoinCode, TCoinHistoryMode, TCoinHistroryDataElement } from '../../../utils/types';

const initialState = {
  coinInfo: {} as TCoinFullInfo,
  coinHistory: [] as TCoinHistroryDataElement[],
  historyMode: '1d' as TCoinHistoryMode,
  targetCoinCode: 'USD' as TCoinCode,

  isFetching: false as boolean,
  isHistoryFetching: false as boolean,
  _historyError: '' as string,
  _error: '' as string
}

export type TReducerState = typeof initialState

const CoinInfoReducer = (state = initialState, action: TActions): TReducerState => {
  switch (action.type) {
    case 'COIN_INFO/LOAD:SUCCESS': return {
      ...state,
      coinInfo: action.payload,
      isFetching: false,
      _error: ''
    }

    case 'COIN_INFO/LOAD:FAILURE': return {
      ...state,
      isFetching: false,
      _error: action.payload
    }

    case 'COIN_INFO/LOAD:REQUEST': return {
      ...state,
      isFetching: true
    }

    case 'COIN_INFO/RESET': return {
      ...state,
      coinInfo: {} as TCoinFullInfo
    }

    case 'COIN_HISTORY/LOAD:REQUEST': return {
      ...state,
      isHistoryFetching: true
    }

    case 'COIN_HISTORY/LOAD:FAILURE': return {
      ...state,
      isHistoryFetching: false,
      _historyError: action.payload
    }

    case 'COIN_HISTORY/LOAD:SUCCESS': return {
      ...state,
      coinHistory: action.payload,
      isHistoryFetching: false,
      _historyError: ''
    }

    case 'COIN_HISTORY/MODE:CHANGE': return {
      ...state,
      historyMode: action.payload
    }

    case 'COIN/TARGET_CODE:SET': return {
      ...state,
      targetCoinCode: action.payload
    }

    default: return state
  }
}

export default CoinInfoReducer