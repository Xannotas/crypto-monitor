import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { TCoinCode, TCoinFullInfo } from '../../utils/types'
import { TRootState } from '../../store'
import { getCoinInfo, resetCoinInfo } from '../../store/coinInfo/actions'
import {
  isFetchingSelector,
  coinInfoSelector,
  targetCoinCodeSelector,
  errorSelector,
} from '../../store/coinInfo/selectors'

import { Loader } from '../../components'
import { CoinInfo } from '../../containers'

type TMapState = {
  coinInfo: TCoinFullInfo
  isFetching: boolean
  targetCoinCode: TCoinCode
  error: string
}
type TMapDispatch = {
  getCoinInfo: (coinCode: TCoinCode) => void
  resetCoinInfo: () => void
}

type TProps = RouteComponentProps & TMapState & TMapDispatch

const CoinPage: React.FC<TProps> = ({
  match,
  getCoinInfo,
  resetCoinInfo,
  isFetching,
  coinInfo,
  targetCoinCode,
  error,
}) => {
  // @ts-ignore
  const coinCode = match.params.code.toUpperCase()

  useEffect(() => {
    getCoinInfo(coinCode)
    return () => {
      resetCoinInfo()
    }
  }, [coinCode, targetCoinCode]) // eslint-disable-line

  return (
    <section className='coin-page'>
      <div className='container'>
        {isFetching
          ? <Loader />
          : <>
            {Object.keys(coinInfo).length && !error
              ? <CoinInfo coinInfo={coinInfo} targetCoinCode={targetCoinCode} />
              : <p>{error}</p>
            }
          </>
        }
      </div>
    </section>
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    coinInfo: coinInfoSelector(state),
    isFetching: isFetchingSelector(state),
    targetCoinCode: targetCoinCodeSelector(state),
    error: errorSelector(state),
  }
}

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, {
  getCoinInfo,
  resetCoinInfo,
})(React.memo(CoinPage))
