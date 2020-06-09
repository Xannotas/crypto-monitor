import React from 'react'
import classNames from 'classnames'

import './coinInfo.scss'
import { TCoinFullInfo } from '../../types'

type TProps = {
  coinInfo: TCoinFullInfo
}

const CoinInfo: React.FC<TProps> = ({ coinInfo }) => {
  const priceDown = coinInfo.changePercent24Hour && coinInfo.changePercent24Hour[0] === '-' ? true : false

  return (
    <div className="coin-info">
      <h3 className="coin-info__title">{coinInfo.name} <small>({coinInfo.code})</small></h3>

      <div className="coin-info-price">

        <div className='coin-info__logo'>
          <img src={coinInfo.imageUrl} alt={coinInfo.code} />
        </div>

        <div className="coin-info-price__wrapper">
          <div>1 {coinInfo.code} =</div>
          <span className="h2">{coinInfo.price}</span>

          <span className="coin-info-price__arrow ml-2">
            {priceDown
              ? <svg className="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#ff7060" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
              : <svg className="bi bi-caret-up-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#26da71" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            }
          </span>

          <span className={classNames('coin-info-price__change', 'h4', { 'coin-info-price__change--is-down': priceDown })}>
            {coinInfo.change24Hour} ({coinInfo.changePercent24Hour} %)
          </span>
        </div>

      </div>

    </div>
  )
}

export default CoinInfo
