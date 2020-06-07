import React from 'react';
import CoinsPage from './pages/CoinsPage';
import CurrencyConverter from './containers/CurrencyConverter';

const App: React.FC = () => {

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <CoinsPage />
          </div>
          <div className="col-md-4 mt-2">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
