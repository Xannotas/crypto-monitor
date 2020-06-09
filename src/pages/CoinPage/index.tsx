import React, { useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { TRootState } from '../../store'
import { getCoinInfo, resetCoinInfo } from '../../store/coinInfo/actions'
import { TCoinCode, TCoinFullInfo } from '../../types'
import { currencies } from '../../constants'
import { isFetchingSelector, coinInfoSelector } from '../../store/coinInfo/selectors'

import Loader from '../../components/Loader'
import CoinInfo from '../../components/CoinInfo'

type TMapState = {
  coinInfo: TCoinFullInfo,
  isFetching: boolean
}
type TMapDispatch = {
  getCoinInfo: (coinCode: TCoinCode) => void,
  resetCoinInfo: () => void
}

type TProps = RouteComponentProps & TMapState & TMapDispatch

const CoinPage: React.FC<TProps> = ({ match, getCoinInfo, resetCoinInfo, isFetching, coinInfo }) => {
  // @ts-ignore
  const coinCode: TCoinCode = match.params.code.toUpperCase()

  const validCoinCode = currencies[coinCode]

  useEffect(() => {
    if (validCoinCode) {
      getCoinInfo(coinCode)
    }
    return () => {
      resetCoinInfo()
    }
  }, [coinCode]) // eslint-disable-line

  if (!validCoinCode) {
    return <Redirect to='/home' />
  }

  return (
    <div className='coin'>
      <div className="container">
        {isFetching
          ? <Loader />
          : <>
            {coinInfo &&
              <CoinInfo coinInfo={coinInfo}/>
            }
          </>
        }
      </div>
    </div>
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    coinInfo: coinInfoSelector(state),
    isFetching: isFetchingSelector(state)
  }
}

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, { getCoinInfo, resetCoinInfo })(CoinPage)
