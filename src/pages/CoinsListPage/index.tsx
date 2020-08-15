import React from 'react'
import { connect } from 'react-redux'

import './coinsListPage.scss'
import { TRootState } from '../../store'
import { changePageNumber } from '../../store/topCoinsList/actions'
import {
  pageNumberSelector,
  isFetchingSelector,
  coinsSelector,
} from '../../store/topCoinsList/selectors'

import { TopCoinsContainer } from '../../containers'
import { SimplePagination } from '../../components'
import { TCoinInfo } from '../../utils/types'

type TMapState = {
  pageNumber: number
  isFetching: boolean
  coins: TCoinInfo[]
}

type TMapDispatch = {
  changePageNumber: (newPage: number) => void
}

type TProps = TMapState & TMapDispatch

const CoinPage: React.FC<TProps> = ({
  changePageNumber,
  pageNumber,
  isFetching,
  coins
}) => {
  const pageSize = 100
  const maxCoins = 3000

  return (
    <div className='coins-list-page'>
      <div className='container'>
        {!isFetching && coins.length > 0 && (
          <SimplePagination
            pageNumber={pageNumber}
            maxPageNumber={maxCoins / pageSize}
            onPageChange={changePageNumber}
          />
        )}

        <div className='mt-2'>
          <TopCoinsContainer limit={pageSize} pageSize={pageSize} />
        </div>

        {!isFetching && coins.length > 0 && (
          <SimplePagination
            pageNumber={pageNumber}
            maxPageNumber={maxCoins / pageSize}
            onPageChange={changePageNumber}
          />
        )}
      </div>
    </div>
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    pageNumber: pageNumberSelector(state),
    isFetching: isFetchingSelector(state),
    coins: coinsSelector(state)
  }
}

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, {
  changePageNumber
})(React.memo(CoinPage))
