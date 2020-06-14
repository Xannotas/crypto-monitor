import React, { useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { currencies } from '../../utils/constants'
import { TCoinCode, TCoinFullInfo } from '../../utils/types'
import { TRootState } from '../../store'
import { getCoinInfo, resetCoinInfo } from '../../store/coinInfo/actions'
import { isFetchingSelector, coinInfoSelector, targetCoinCodeSelector } from '../../store/coinInfo/selectors'

import Loader from '../../components/Loader'
import CoinInfo from '../../containers/CoinInfo'

type TMapState = {
  coinInfo: TCoinFullInfo,
  isFetching: boolean,
  targetCoinCode: TCoinCode
}
type TMapDispatch = {
  getCoinInfo: (coinCode: TCoinCode) => void,
  resetCoinInfo: () => void
}

type TProps = RouteComponentProps & TMapState & TMapDispatch

const CoinPage: React.FC<TProps> = ({ match, getCoinInfo, resetCoinInfo,
  isFetching, coinInfo, targetCoinCode }) => {

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
  }, [coinCode, targetCoinCode]) // eslint-disable-line

  if (!validCoinCode) {
    return <Redirect to='/home' />
  }

  return (
    <div className='coin'>
      <div className="container">
        {isFetching
          ? <Loader />
          : <>
            {Object.keys(coinInfo).length &&
              <CoinInfo coinInfo={coinInfo} targetCoinCode={targetCoinCode}/>
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
    isFetching: isFetchingSelector(state),
    targetCoinCode: targetCoinCodeSelector(state)
  }
}

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, { getCoinInfo, resetCoinInfo })(CoinPage)
