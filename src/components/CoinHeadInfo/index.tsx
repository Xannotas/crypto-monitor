import React from 'react'
import classNames from 'classnames'
import fromUnixTime from 'date-fns/fromUnixTime'
import formatDate from 'date-fns/format'

import './coinHeadInfo.scss'
import clockSvg from '../../assets/icons/clock.svg'
import { TCoinFullInfo, TCoinCode } from '../../utils/types'

type TProps = {
  coinInfo: TCoinFullInfo
  targetCoinCode: TCoinCode
}

const CoinHeadInfo: React.FC<TProps> = ({ coinInfo, targetCoinCode }) => {
  const priceDown: boolean = coinInfo.changePercent24Hour && coinInfo.changePercent24Hour[0] === '-' ? true : false

  return (
    <div className='coin-info-head'>
      <h3 className='coin-info-head__title'>
        {coinInfo.name ? coinInfo.name : coinInfo.code}
        <small className={classNames('ml-2', { 'd-none': !coinInfo.name })}>({coinInfo.code})</small>
      </h3>

      <div className='coin-info-head__wrapper'>
        <div className='coin-info-head__logo'>
          <img src={coinInfo.imageUrl} alt={coinInfo.code} />
        </div>

        <div>
          <div>1 {coinInfo.code} =</div>
          <span className='coin-info-head__price-text'>{coinInfo.price}</span>

          <div
            className={classNames(
              'coin-info-head__price-change',
              { 'coin-info-head__price-change--is-down': priceDown },
              { 'd-none': coinInfo.code === targetCoinCode }
            )}
          >
            <span className='coin-info-head__change-arrow'>
              <svg
                className='bi bi-caret-down-fill'
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                fill={priceDown ? '#ff7060' : '#26da71'}
                xmlns='http://www.w3.org/2000/svg'
              >
                {priceDown
                  ? <path d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
                  : <path d='M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
                }
              </svg>
              
            </span>
            {coinInfo.change24Hour} ({coinInfo.changePercent24Hour} %)
          </div>

          {coinInfo.lastPriceUpdate &&
            <div className='coin-info-head__price-date'>
              <img src={clockSvg} alt="last update" />
              <span>{formatDate(fromUnixTime(coinInfo.lastPriceUpdate), 'dd.MM.yyyy HH:mm')}</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default React.memo(CoinHeadInfo)
