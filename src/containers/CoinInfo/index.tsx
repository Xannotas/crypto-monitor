import React, { useEffect } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

import './coinInfo.scss'
import { TCoinFullInfo, TCoinHistroryDataElement, TCoinHistoryMode, TCoinCode } from '../../types'

import Loader from '../../components/Loader';
import { TRootState } from '../../store'
import { isHistoryFetchingSelector, coinHistorySelector, historyModeSelector } from '../../store/coinInfo/selectors'
import { changeHistoryMode, getCoinHistory } from '../../store/coinInfo/actions'

type TOwnProps = {
  coinInfo: TCoinFullInfo
}

type TMapState = {
  coinHistory: TCoinHistroryDataElement[],
  historyMode: TCoinHistoryMode,
  isHistoryFetching: boolean,
}

type TMapDispatch = {
  getCoinHistory: (coinCode: TCoinCode) => void,
  changeHistoryMode: (mode: TCoinHistoryMode) => void
}

type TProps = TOwnProps & TMapState & TMapDispatch

const CoinInfo: React.FC<TProps> = ({ coinInfo, coinHistory, isHistoryFetching, historyMode, changeHistoryMode, getCoinHistory }) => {

  const priceDown = coinInfo.changePercent24Hour && coinInfo.changePercent24Hour[0] === '-' ? true : false

  const prices: number[] = coinHistory.map(row => row.price)
  const priceRange = {
    'min': Math.min(...prices),
    'max': Math.max(...prices)
  }

  const navItems = {
    '1h': '1 hour',
    '1d': '1 day',
    '1w': '1 week',
    '1m': '1 month',
    '3m': '3 months',
    '6m': '6 months',
    '1y': '1 year',
    '3y': '3 year'
  }

  const formatCost = (cost: string) => {
    const res = `${coinInfo.toSymbol !== coinInfo.toCode && coinInfo.toSymbol}
    ${cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
    ${coinInfo.toCode}`
    return res
  }

  const toFixed = (text: string, length: number = 2, symb: string = '.') => {
    const splitedText = text.toString().split(symb) || ''
    if (splitedText[1] && length > 0) {
      return `${splitedText[0]}.${splitedText[1].slice(0, length)}`
    }
    return splitedText[0]
  }

  const onChartClick = (mode: TCoinHistoryMode) => () => {
    changeHistoryMode(mode)
  }

  useEffect(() => {
    getCoinHistory(coinInfo.code)
  }, [historyMode]) // eslint-disable-line

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

      <table className="table mt-3">
        <thead className='thead-dark'>
          <tr>
            <th scope="col">MARKET CAP</th>
            <th scope="col">24H VOLUME</th>
            <th scope="col">Low/High 24h</th>
            <th scope="col">Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatCost(toFixed(coinInfo.mktcap, 0))}</td>
            <td>{formatCost(toFixed(coinInfo.directVol, 0))}</td>
            <td>
              {formatCost(`${toFixed(coinInfo.low24Hour, 3)} / ${toFixed(coinInfo.high24Hour, 3)}`)}
            </td>
            <td>{formatCost(toFixed(coinInfo.supply, 0))}</td>
          </tr>
        </tbody>
      </table>

      <div className={classNames("coin-info-rechart", { 'fetching': isHistoryFetching })}>
        {isHistoryFetching
          ? <Loader />
          : <>
            <div className="coin-info-rechart__controll">
              <ul className="nav nav-tabs">
                {Object.entries(navItems).map(([key, value]) => (
                  <li key={key} className="nav-item">
                    <button className={classNames('btn', 'nav-link', { 'active': key === historyMode })}
                      onClick={onChartClick(key as TCoinHistoryMode)}>
                      {value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="coin-info-rechart__content">
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart
                  data={coinHistory}
                  margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                  }}
                >
                  <XAxis dataKey="title" />
                  <YAxis domain={[priceRange.min, priceRange.max]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="price" stroke="#82bcf3" fill="#cce6ff" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        }
      </div>
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
