import { TActions } from '../actions';
import { TCoinInfo } from '../../../utils/types';

const initialState = {
  coins: [] as TCoinInfo[],
  isFetching: false as boolean,
  pageNumber: 0 as number,
  _error: '' as string
}

export type TReducerState = typeof initialState 

const topCoinsReducer = (state = initialState, action: TActions) : TReducerState=> {
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

    case 'TOP_COINS/GET_COINS:REQUEST' : {
      return {
        ...state,
        isFetching: true,
        _error: ''
      }
    }

    case 'TOP_COINS/PAGE_NUMBER:CHANGE' : {
      return {
        ...state,
        pageNumber: action.payload
      }
    }

    case 'TOP_COINS/LIST:RESET': {
      return {
        ...state,
        pageNumber: 0,
        coins: [],
        _error: ''
      }
    }

    default: return state
  }
}

export default topCoinsReducer