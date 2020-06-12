import React from 'react'
import classNames from 'classnames'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

import './coinChart.scss'
import Loader from '../../components/Loader';
import { TCoinHistoryMode } from '../../utils/types';
import { toRoundValue } from '../../utils/helpers';

type TProps = {
  prices: number[],
  isFetching: boolean,
  data: any[],

  historyMode: TCoinHistoryMode,
  changeHistoryMode: (mode: TCoinHistoryMode) => void
}
const CoinChart: React.FC<TProps> = ({ prices, isFetching, changeHistoryMode, data, historyMode }) => {
  const navItemValues = {
    '1h': '1 hour',
    '1d': '1 day',
    '1w': '1 week',
    '1m': '1 month',
    '3m': '3 months',
    '6m': '6 months',
    '1y': '1 year',
    '3y': '3 year'
  }

  const priceRange = {
    'min': Math.min(...prices),
    'max': Math.max(...prices)
  }

  return (
    <div className={classNames("coin-info-rechart", { 'fetching': isFetching })}>
      {isFetching
        ? <Loader />
        : <>
          <div className="coin-info-rechart__controll">
            <ul className="nav nav-tabs">
              {Object.entries(navItemValues).map(([key, value]) => (
                <li key={key} className="nav-item">
                  <button className={classNames('btn', 'nav-link', { 'active': key === historyMode })}
                    onClick={() => changeHistoryMode(key as TCoinHistoryMode)}>
                    {value}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="coin-info-rechart__content">
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart
                data={data}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                }}
              >
                <XAxis dataKey="title" />
                <YAxis domain={[toRoundValue(priceRange.min - 100), toRoundValue(priceRange.max + 100)]} />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#82bcf3" fill="#cce6ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    </div>
  )
}

export default CoinChart
