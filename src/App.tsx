import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';

import CurrencyConverter from './containers/CurrencyConverter';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8">
            <Switch>
              <Route exact path='/home' component={HomePage} />
              <Route exact path='/coins/:code' component={CoinPage} />

              <Redirect from='*' to='/home' />
            </Switch>
          </div>
          <div className="col-md-4">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
