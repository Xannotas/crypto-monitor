import React from 'react'

import { CurrencyConverter, TopCoinsContainer } from '../../containers'

const HomePage: React.FC = () => {
  return <section className='home-page'>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8 order-2'>
          <h2>Top 10 crypto currency</h2>
          <TopCoinsContainer limit={10} />
        </div>
        <div className='col-lg-4 order-lg-2'>
          <CurrencyConverter />
        </div>
      </div>
    </div>
  </section>
}

export default React.memo(HomePage)
