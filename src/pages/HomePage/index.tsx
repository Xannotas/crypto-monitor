import React from 'react'
import { connect } from 'react-redux'

import { TRootState } from '../../store'
import { TCoinInfo } from '../../utils/types'
import {
  coinsSelector,
  isFetchingSelector,
  errorSelector,
} from '../../store/topCoinsList/selectors'

import { CurrencyConverter, TopCoinsContainer } from '../../containers'

type TStateProps = {
  coins: TCoinInfo[]
  isFetching: boolean
  error: string
}

type TDispatchProps = {}

type TProps = TStateProps & TDispatchProps

const HomePage: React.FC<TProps> = () => {
  return (
    <section className='coins'>
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
  )
}

const mapState = (state: TRootState): TStateProps => ({
  coins: coinsSelector(state),
  isFetching: isFetchingSelector(state),
  error: errorSelector(state),
})

export default connect<TStateProps, TDispatchProps, {}, TRootState>(mapState)(
  HomePage
)
