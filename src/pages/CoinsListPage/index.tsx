import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import './coinsListPage.scss'
import { TRootState } from '../../store'

import TopCoinsContainer from '../../containers/TopCoinsContainer'

type TMapState = {
  
}
type TMapDispatch = {
  
}

type TProps = RouteComponentProps & TMapState & TMapDispatch

const CoinPage: React.FC<TProps> = () => {
  return (
    <div className='coins-list'>
      <div className="container">
        <TopCoinsContainer limit={50}/>
      </div>
    </div>
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    
  }
}

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState)(CoinPage)
