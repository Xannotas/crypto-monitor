import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import api from './api'
import { TRootState } from './store'
import { TCoinCode } from './utils/types'
import { setCurrencies } from './utils/constants'
import { targetCoinCodeSelector } from './store/coinInfo/selectors'

import { HomePage, CoinPage, CoinsListPage } from './pages'
import { HeaderCointainer } from './containers'

type TMapState = {
  targetCoinCode: TCoinCode
}

const App: React.FC<TMapState> = ({ targetCoinCode }) => {
  useEffect(() => {
    try {
      api.coinInfo.getCoinsBaseInfo(100, targetCoinCode).then((res: any) => {
        if (res && res.data.Response === 'Success') {
          const coinsEntries: Array<Array<
            string
          >> = res.data.Data.map((row: any) => [row.SYMBOL, row.NAME])
          const currencies = Object.fromEntries(coinsEntries)

          if (coinsEntries.length) {
            setCurrencies(currencies)
          }
        }
      })
    } catch (e) {
      console.warn(e)
    }
  }, []) // eslint-disable-line

  return (
    <div className='App'>
      <HeaderCointainer />

      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/coins' component={CoinsListPage} />
        <Route exact path='/coins/:code' component={CoinPage} />

        <Redirect from='*' to='/home' />
      </Switch>
    </div>
  )
}

const mapState = (state: TRootState): TMapState => ({
  targetCoinCode: targetCoinCodeSelector(state),
})

export default connect<TMapState, {}, {}, TRootState>(mapState)(App)
