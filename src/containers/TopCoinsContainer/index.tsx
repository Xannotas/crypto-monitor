import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './topCoinsContainer.scss'
import { TRootState } from '../../store'
import { TCoinInfo, TCoinCode } from '../../utils/types'
import { getCoins, resetCoinsList } from '../../store/topCoinsList/actions'
import { targetCoinCodeSelector } from '../../store/coinInfo/selectors'
import {
  coinsSelector,
  isFetchingSelector
} from '../../store/topCoinsList/selectors'

import { TopCoinsTable, Loader } from '../../components'

type TOwnProps = {
  limit: number
  pageSize?: number
  pageNumber?: number
}

type TMapState = {
  coins: TCoinInfo[]
  isFetching: boolean
  targetCoinCode: TCoinCode
}

type TMapDispatch = {
  getCoins: (limit: number, page: number | undefined) => void
  resetCoinsList: () => void
}

type TProps = TMapState & TMapDispatch & TOwnProps

const TopCoinsContainer: React.FC<TProps> = ({
  coins,
  pageNumber,
  isFetching,
  limit,
  targetCoinCode,
  pageSize,
  getCoins,
  resetCoinsList
}) => {
  useEffect(() => {
    getCoins(limit, pageNumber)
  }, [pageNumber, targetCoinCode]) // eslint-disable-line

  return (
    <div className='top-coins'>
      {isFetching
        ? <Loader />
        : <>
          {coins.length > 0 && <div className='top-coins__wrapper'>
            <TopCoinsTable
              coins={coins}
              pageNumber={pageNumber}
              pageSize={pageSize}
              targetCoinCode={targetCoinCode}
              resetCoinsList={resetCoinsList}
            />
          </div>
          }
        </>
      }
    </div>
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    coins: coinsSelector(state),
    isFetching: isFetchingSelector(state),
    targetCoinCode: targetCoinCodeSelector(state),
  }
}

export default connect<TMapState, TMapDispatch, TOwnProps, TRootState>(
  mapState,
  { getCoins, resetCoinsList }
)(React.memo(TopCoinsContainer))
