import React, {useState} from 'react'
import { connect } from 'react-redux'

import './coinsListPage.scss'
import { TRootState } from '../../store'
import {
  isFetchingSelector,
  coinsSelector,
} from '../../store/topCoinsList/selectors'

import { TopCoinsContainer } from '../../containers'
import { SimplePagination } from '../../components'
import { TCoinInfo } from '../../utils/types'

type TMapState = {
  isFetching: boolean
  coins: TCoinInfo[]
}

type TProps = TMapState

const CoinPage: React.FC<TProps> = ({
  isFetching,
  coins
}) => {

  const [pageNumber, setPageNumber] = useState<number>(0)
  const pageSize = 100
  const maxCoins = 3000

  const changePageNumber = (num: number) => {
    setPageNumber(num)
  }

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
          <TopCoinsContainer limit={pageSize} pageSize={pageSize} pageNumber={pageNumber}/>
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
    isFetching: isFetchingSelector(state),
    coins: coinsSelector(state)
  }
}

export default connect<TMapState, {}, {}, TRootState>(mapState)(React.memo(CoinPage))
