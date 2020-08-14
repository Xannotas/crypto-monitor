import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { HomePage, CoinPage, CoinsListPage } from './pages'
import { HeaderCointainer } from './containers'

const App = () => {
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

export default App
