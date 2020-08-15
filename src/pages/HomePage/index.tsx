import React from 'react'
import { connect } from 'react-redux'

import { TRootState } from '../../store'
import { isFetchingSelector } from '../../store/topCoinsList/selectors'

import { CurrencyConverter, TopCoinsContainer } from '../../containers'

type TStateProps = {
  isFetching: boolean
}

type TDispatchProps = {}

type TProps = TStateProps & TDispatchProps

const HomePage: React.FC<TProps> = ({ isFetching }) => {
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

const mapState = (state: TRootState): TStateProps => ({
  isFetching: isFetchingSelector(state)
})

export default connect<TStateProps, TDispatchProps, {}, TRootState>(
  mapState
)(React.memo(HomePage))
