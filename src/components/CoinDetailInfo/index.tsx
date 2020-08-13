import React from 'react'

import './coinDetailInfo.scss'
import { TCoinFullInfo } from '../../utils/types'
import { toFixedString, formatCost } from '../../utils/helpers'

type TProps = {
  coinInfo: TCoinFullInfo
}
const CoinDetailInfo: React.FC<TProps> = ({ coinInfo }) => {
  return (
    <div className='coin-info-detail-info'>
      <div className='coin-info-detail-info__head-info'>
        <div className='item'>
          <div className='title'>Market capitalization</div>
          <div className='text'>
            {formatCost(
              toFixedString(coinInfo.mktcap, 0),
              coinInfo.toSymbol,
              coinInfo.toCode
            )}
          </div>
        </div>

        <div className='item'>
          <div className='title'>24H Volume</div>
          <div className='text'>
            {formatCost(
              toFixedString(coinInfo.directVol, 0),
              coinInfo.toSymbol,
              coinInfo.toCode
            )}
          </div>
        </div>

        <div className='item'>
          <div className='title'>Low/High 24h</div>
          <div className='text'>
            {formatCost(
              `${toFixedString(coinInfo.low24Hour, 3)} / ${toFixedString(
                coinInfo.high24Hour,
                3
              )}`,
              coinInfo.toSymbol,
              coinInfo.toCode
            )}
          </div>
        </div>

        <div className='item'>
          <div className='title'>Circulating Supply</div>
          <div className='text'>
            {formatCost(toFixedString(coinInfo.supply, 0), '$', 'USD')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinDetailInfo
