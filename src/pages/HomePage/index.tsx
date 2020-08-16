import React from 'react'

import { CurrencyConverter, TopCoinsContainer } from '../../containers'

const HomePage: React.FC = () => {
  return <section className='home-page'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <h2>Top 10 crypto currency</h2>
          <TopCoinsContainer limit={10} />
        </div>
        <div className='col-md-4'>
          <CurrencyConverter />
        </div>
      </div>
    </div>
  </section>
}

export default React.memo(HomePage)
