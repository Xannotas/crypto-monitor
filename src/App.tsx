import React from 'react';
import api from './api';

const App: React.FC = () => {
  React.useEffect(() => {
    api.prices.getPrice('USD', ['RUB', 'USD','EUR'])
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
