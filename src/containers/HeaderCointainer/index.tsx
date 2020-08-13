import React from 'react'
import { connect } from 'react-redux'

import { TRootState } from '../../store'
import { targetCoinCodeSelector } from '../../store/coinInfo/selectors'
import { setTargetCoinCode } from '../../store/coinInfo/actions'
import { TCoinCode } from '../../utils/types'

import { Header } from '../../components'

type TMapState = {
  targetCoinCode: TCoinCode
}

type TMapDispatch = {
  setTargetCoinCode: (code: TCoinCode) => void
}

type TProps = TMapState & TMapDispatch

const CoinInfo: React.FC<TProps> = ({ targetCoinCode, setTargetCoinCode }) => {
  const onTargetCoinCodeChanged = (code: TCoinCode) => {
    setTargetCoinCode(code)
  }

  return (
    <Header
      targetCoinCode={targetCoinCode}
      onTargetCoinChange={onTargetCoinCodeChanged}
    />
  )
}

const mapState = (state: TRootState): TMapState => {
  return {
    targetCoinCode: targetCoinCodeSelector(state),
  }
}

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, {
  setTargetCoinCode,
})(CoinInfo)
