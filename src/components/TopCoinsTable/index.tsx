import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './topCoinsTable.scss'
import setupSocket from '../../sockets'
import { TCoinInfo, TCoinCode } from '../../utils/types'
import { trimRemain, formatCost } from '../../utils/helpers'

type TProps = {
  coins: TCoinInfo[]
  pageNumber?: number
  pageSize?: number
  targetCoinCode: TCoinCode
  resetCoinsList: () => void
}
const TopCoinsTable: React.FC<TProps> = ({
  coins,
  pageNumber,
  pageSize = 0,
  targetCoinCode,
  resetCoinsList
}) => {
  const priceLiveTimeMs: number = 2000

  useEffect(() => {
    if (coins.length > 0) {
      const socket = setupSocket(coins.map((c) => c.code), targetCoinCode)

      return () => {
        if(coins.length > 0) {
          resetCoinsList()
        }
        socket.close()
      }
    }
  }, [coins.length, pageNumber]) //eslint-disable-line
  
  return <table className='table top-coins-table'>
    <thead>
      <tr>
        <th scope='col-2'>#</th>
        <th scope='col'>Name</th>
        <th scope='col'>Price</th>
        <th scope='col'>Direct Vol</th>
        <th scope='col'>Total Vol</th>
        <th scope='col'>Market cap.</th>
      </tr>
    </thead>
    <tbody>
      {coins.map((coin, index) => {
        const date: number = new Date().getTime()
        const priceLivingTimeMs = coin.lastPriceUpdate ? date - coin.lastPriceUpdate : 0

        return <tr key={coin.code}>
          <th scope='row'>{index + 1 + (pageNumber ? pageNumber * pageSize : 0)}</th>
          <td>
            <Link to={`coins/${coin.code}`} className='top-coins__coin-name'>
              <img
                className='top-coins__coin-image'
                src={coin.imageUrl}
                alt='coin logo'
              />
              <span className='top-coins__coin-text'>
                <strong>{coin.code}</strong>
                <br />
                <small>{coin.name}</small>
              </span>
            </Link>
          </td>
          <td>
            <div
              className={classNames({
                'price-down': coin.priceDirection && coin.priceDirection < 0 && priceLivingTimeMs < priceLiveTimeMs,
                'price-up': coin.priceDirection && coin.priceDirection > 0 && priceLivingTimeMs < priceLiveTimeMs,
              })}
            >
              {coin.toSymbol} {trimRemain(formatCost(coin.price, ' '), 8)}
            </div>
          </td>
          <td>{coin.toSymbol} {trimRemain(formatCost(coin.directVol, ' '), 0)}</td>
          <td>{coin.totalVol}</td>
          <td>{coin.mktcap}</td>
        </tr>
      })}
    </tbody>
  </table>
}

export default React.memo(TopCoinsTable)
