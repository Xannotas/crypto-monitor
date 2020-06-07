import React from 'react'
import CurrencyConverterForm from '../../components/CurrencyConverterForm'

import './currencyConverter.scss'
import { TCoinCode } from '../../types'
import { connect } from 'react-redux'
import { TRootState } from '../../store'
import { priceSelector } from '../../store/currencyConverter/selectors'
import { getPrice } from '../../store/currencyConverter/actions'

type TMapState = {
  // currencyCode: TCoinCode,
  // targetCurrencyCode: TCoinCode,
  price: number,
}

type TMapDispatch = {
  getPrice: (currency: TCoinCode, targetCurrency: TCoinCode) => void
}

const CurrencyConverter: React.FC<TMapState & TMapDispatch> = ({ price, getPrice }) => {
  const onCurrencyChange = (currency: TCoinCode, targetCurrency: TCoinCode) => {
    getPrice(currency, targetCurrency)
  }

  return (
    <div className='currency-converter'>
      <h5>Currency converter</h5>
      <CurrencyConverterForm price={price} onCurrencyChange={onCurrencyChange} />
    </div>
  )
}

const mapState = (state: TRootState): TMapState => ({
  price: priceSelector(state)
})

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, { getPrice })(CurrencyConverter)