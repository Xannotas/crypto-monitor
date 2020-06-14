import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

import './coinChart.scss'
import Loader from '../../components/Loader';
import { TCoinHistoryMode, TCoinCode } from '../../utils/types';
import { toRoundValue, formatCost } from '../../utils/helpers';

type TProps = {
  prices: number[],
  isFetching: boolean,
  data: any[],
  toSymbol: string,
  toCode: TCoinCode,

  historyMode: TCoinHistoryMode,
  historyError: string,
  changeHistoryMode: (mode: TCoinHistoryMode) => void
}
const CoinChart: React.FC<TProps> = ({ prices, isFetching, changeHistoryMode, data, historyMode, toSymbol, toCode, historyError }) => {
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
    'min': prices.length ? Math.min(...prices) : 0,
    'max': prices.length ? Math.max(...prices) : 0
  }

  const domainRange = {
    'min': priceRange.min ? toRoundValue(priceRange.min - priceRange.min / 10) : 0,
    'max': priceRange.max ? toRoundValue(priceRange.max + priceRange.max / 10) : 0
  }

  type TRenderTooltipContentProps = {
    payload: PropsWithChildren<TRenderTooltipContentProps>[]
  }
  const renderTooltipContent: React.FC<TRenderTooltipContentProps> = ({ payload }) => {
    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${payload.length && (payload[0].payload as any).fullDate}`}</p>
        <ul className="list">
          {
            payload.map((entry: any, index) => (
              <li key={`item-${index}`} style={{ color: entry.color }}>
                {`${entry.name} : ${formatCost(entry.value, toSymbol, toCode)}`}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

  return (
    <div className={classNames("coin-info-rechart", { 'fetching': isFetching }, { 'error': historyError })}>
      <div className={classNames("coin-info-rechart__wrapper", { 'fetching': isFetching }, { 'error': historyError })}>
      {isFetching
        ? <Loader />
        : <>
          {!historyError
            ? <>
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
                <ResponsiveContainer width='100%' height='50%' minWidth='800px' minHeight='300px'>
                  <AreaChart
                    data={data}
                    margin={{
                      top: 10, right: 30, left: 0, bottom: 0,
                    }}
                  >
                    <XAxis dataKey='formatedDate' minTickGap={20} />
                    <YAxis domain={[domainRange.min, domainRange.max]} width={90} />
                    <Tooltip content={renderTooltipContent} />
                    <Area type="monotone" dataKey="price" stroke="#82bcf3" fill="#cce6ff" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>

            : <div>
              <div>{historyError}</div>
              <div>Please change target currency.</div>
            </div>
          }
        </>
      }
    </div>
    </div>
  )
}

export default CoinChart
