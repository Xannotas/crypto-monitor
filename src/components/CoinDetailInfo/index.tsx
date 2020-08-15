import React from 'react'

import './coinDetailInfo.scss'
import { TCoinFullInfo } from '../../utils/types'
import { trimRemain, formatCost } from '../../utils/helpers'

type TProps = {
  coinInfo: TCoinFullInfo
}

const CoinDetailInfo: React.FC<TProps> = ({ coinInfo }) => {

  const wrapCoinCode = (cost: string) => {
    return `${coinInfo.toSymbol} ${cost} ${coinInfo.toCode}`
  }

  return (
    <div className='coin-info-detail-info'>
      <div className='coin-info-detail-info__head-info'>
        <div className='item'>
          <div className='title'>Market capitalization</div>
          <div className='text'>
            {wrapCoinCode(formatCost(trimRemain(coinInfo.mktcap, 0)))}
          </div>
        </div>

        <div className='item'>
          <div className='title'>24H Volume</div>
          <div className='text'>
            {wrapCoinCode(formatCost(trimRemain(coinInfo.directVol, 0)))}
          </div>
        </div>

        <div className='item'>
          <div className='title'>Low/High 24h</div>
          <div className='text'>
            {wrapCoinCode(`
              ${formatCost(trimRemain(coinInfo.low24Hour, 3))} / ${formatCost(trimRemain(coinInfo.high24Hour, 3))}
            `)}
          </div>
        </div>

        <div className='item'>
          <div className='title'>Circulating Supply</div>
          <div className='text'>
            {wrapCoinCode(formatCost(trimRemain(coinInfo.supply, 0)))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CoinDetailInfo)
