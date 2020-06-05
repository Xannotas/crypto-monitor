import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import topCoinsListReducer from './topCoinsList/reducers';

const rootReducer = topCoinsListReducer

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

export type TRootState = ReturnType<typeof rootReducer>

export default store