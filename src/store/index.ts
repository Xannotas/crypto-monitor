import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'

import topCoinsListReducer from './topCoinsList/reducers';
import currencyConverterReducer from './currencyConverter/reducers';
import coinInfoReducer from './coinInfo/reducers';

const rootReducer = combineReducers({
  topCoinsList: topCoinsListReducer,
  currencyConverter: currencyConverterReducer,
  coinInfo: coinInfoReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

export type TRootState = ReturnType<typeof rootReducer>

export default store