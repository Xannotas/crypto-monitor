import React from 'react';
import CoinsPage from './pages/CoinsPage';

const App: React.FC = () => {

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <CoinsPage />
          </div>
          <div className="col-md-3">
            sidebar
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
