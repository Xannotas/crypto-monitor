import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './coinInfo.scss'
import { TCoinFullInfo, TCoinHistroryDataElement, TCoinHistoryMode, TCoinCode } from '../../utils/types'
import { TRootState } from '../../store'
import { isHistoryFetchingSelector, coinHistorySelector, historyModeSelector } from '../../store/coinInfo/selectors'
import { changeHistoryMode, getCoinHistory } from '../../store/coinInfo/actions'
import CoinChart from '../../components/CoinChart'
import CoinDetailInfo from '../../components/CoinDetailInfo'
import CoinHeadInfo from '../../components/CoinHeadInfo'

type TOwnProps = {
  coinInfo: TCoinFullInfo
}

type TMapState = {
  coinHistory: TCoinHistroryDataElement[],
  historyMode: TCoinHistoryMode,
  isHistoryFetching: boolean
}

type TMapDispatch = {
  getCoinHistory: (coinCode: TCoinCode) => void,
  changeHistoryMode: (mode: TCoinHistoryMode) => void
}

type TProps = TOwnProps & TMapState & TMapDispatch

const CoinInfo: React.FC<TProps> = ({ coinInfo, coinHistory, isHistoryFetching, historyMode, changeHistoryMode, getCoinHistory}) => {
  const prices: number[] = coinHistory.map(row => row.price)

  useEffect(() => {
    getCoinHistory(coinInfo.code)
  }, [historyMode]) // eslint-disable-line

  return (
    <div className="coin-info">
      <CoinHeadInfo coinInfo={coinInfo} />

      <CoinDetailInfo coinInfo={coinInfo} />

      <CoinChart data={coinHistory}
        historyMode={historyMode}
        prices={prices}
        isFetching={isHistoryFetching}
        changeHistoryMode={changeHistoryMode}
        toSymbol={coinInfo.toSymbol}
        toCode={coinInfo.toCode}
      />
    </div>
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    coinHistory: coinHistorySelector(state),
    isHistoryFetching: isHistoryFetchingSelector(state),
    historyMode: historyModeSelector(state)
  }
}

export default connect<TMapState, TMapDispatch, TOwnProps, TRootState>(mapState, { changeHistoryMode, getCoinHistory })(CoinInfo)
