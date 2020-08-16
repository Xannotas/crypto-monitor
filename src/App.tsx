import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Loader, Header} from './components'

import HomePage  from './pages/HomePage'
const CoinPage = React.lazy(() => import('./pages/CoinPage'))
const CoinsListPage = React.lazy(() => import('./pages/CoinsListPage'))

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/coins' component={CoinsListPage} />
          <Route exact path='/coins/:code' component={CoinPage} />

          <Redirect from='*' to='/home' />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
