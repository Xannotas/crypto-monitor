import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './topCoinsContainer.scss'
import { TRootState } from '../../store'
import { TCoinInfo, TCoinCode } from '../../utils/types'
import { getCoins } from '../../store/topCoinsList/actions'
import { targetCoinCodeSelector } from '../../store/coinInfo/selectors'
import { coinsSelector, isFetchingSelector, pageNumberSelector } from '../../store/topCoinsList/selectors'

import TopCoinsTable from '../../components/TopCoinsTable'
import Loader from '../../components/Loader'

type TOwnProps = {
  limit: number,
  pageSize?: number
}

type TMapState = {
  coins: TCoinInfo[],
  pageNumber: number,
  isFetching: boolean,
  targetCoinCode: TCoinCode
}

type TMapDispatch = {
  getCoins: (limit: number) => void
}

type TProps = TMapState & TMapDispatch & TOwnProps

const TopCoinsContainer: React.FC<TProps> = ({ coins, pageNumber, isFetching, limit, targetCoinCode, pageSize, getCoins }) => {

  useEffect(() => {
    getCoins(limit)
  }, [pageNumber, targetCoinCode]) // eslint-disable-line

  return (
    <div className='top-coins'>
      {isFetching
        ? <Loader />
        : <div className='top-coins__wrapper'>
          <TopCoinsTable coins={coins} pageNumber={pageNumber} pageSize={pageSize} />
        </div>
      }
    </div>
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    coins: coinsSelector(state),
    pageNumber: pageNumberSelector(state),
    isFetching: isFetchingSelector(state),
    targetCoinCode: targetCoinCodeSelector(state)
  }
}

export default connect<TMapState, TMapDispatch, TOwnProps, TRootState>(mapState, { getCoins })(TopCoinsContainer)
