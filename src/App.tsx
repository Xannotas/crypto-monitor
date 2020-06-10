import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import api from './api';
import { TRootState } from './store';
import { TCoinCode } from './types';
import { targetCoinCodeSelector } from './store/coinInfo/selectors';

import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';
import { setCurrencies } from './constants';

type TMapState = {
  targetCoinCode: TCoinCode
}

const App: React.FC<TMapState> = ({ targetCoinCode }) => {

  useEffect(() => {
    try {
      api.coinInfo.getCoinsBaseInfo(100, targetCoinCode).then(({ data }: any) => {
        if (data.Response === "Success") {
          const coinsEntries = data.Data.map((row: any) => [row.SYMBOL, row.NAME])
          const currencies = Object.fromEntries(coinsEntries)

          if (currencies) {
            setCurrencies(currencies)
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }, []) // eslint-disable-line

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/coins/:code' component={CoinPage} />

        <Redirect from='*' to='/home' />
      </Switch>
    </div>
  );
}

const mapState = (state: TRootState): TMapState => ({
  targetCoinCode: targetCoinCodeSelector(state)
})

export default connect<TMapState, {}, {}, TRootState>(mapState)(App);
