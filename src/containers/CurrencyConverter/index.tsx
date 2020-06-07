import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './currencyConverter.scss'
import { TCoinCode } from '../../types'
import { TRootState } from '../../store'
import { priceSelector, isFetchingSelector } from '../../store/currencyConverter/selectors'
import { getPrice } from '../../store/currencyConverter/actions'

import CurrencyConverterForm from '../../components/CurrencyConverterForm'

type TMapState = {
  price: number,
  isFetching: boolean
}

type TMapDispatch = {
  getPrice: (currency: TCoinCode, targetCurrency: TCoinCode) => void
}

type TProps = TMapState & TMapDispatch

const CurrencyConverter: React.FC<TProps> = ({ price, getPrice, isFetching }) => {
  const defaultCurrency: TCoinCode = 'BTC'
  const defaultTargetCurrency: TCoinCode = 'USD'
  const onCurrencyChange = (currency: TCoinCode, targetCurrency: TCoinCode) => {
    getPrice(currency, targetCurrency)
  }

  useEffect(() => {
    getPrice(defaultCurrency, defaultTargetCurrency)
  }, [])  // eslint-disable-line

  return (
    <div className='currency-converter'>
      <h5>Currency converter
        {isFetching &&
          <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span>
        }
      </h5>
      <CurrencyConverterForm
        price={price}
        onCurrencyChange={onCurrencyChange}
        defaultCurrency={defaultCurrency}
        defaultTargetCurrency={defaultTargetCurrency}
      />
    </div>
  )
}

const mapState = (state: TRootState): TMapState => ({
  price: priceSelector(state),
  isFetching: isFetchingSelector(state),
})

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, { getPrice })(CurrencyConverter)