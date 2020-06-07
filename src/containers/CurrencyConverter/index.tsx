import React from 'react'
import { connect } from 'react-redux'

import './currencyConverter.scss'
import { TCoinCode } from '../../types'
import { TRootState } from '../../store'
import { priceSelector, isFetchingSelector } from '../../store/currencyConverter/selectors'
import { getPrice } from '../../store/currencyConverter/actions'

import Loader from '../../components/Loader'
import CurrencyConverterForm from '../../components/CurrencyConverterForm'

type TMapState = {
  // currencyCode: TCoinCode,
  // targetCurrencyCode: TCoinCode,
  price: number,
  isFetching: boolean
}

type TMapDispatch = {
  getPrice: (currency: TCoinCode, targetCurrency: TCoinCode) => void
}

type TProps = TMapState & TMapDispatch

const CurrencyConverter: React.FC<TProps> = ({ price, getPrice, isFetching }) => {
  const onCurrencyChange = (currency: TCoinCode, targetCurrency: TCoinCode) => {
    getPrice(currency, targetCurrency)
  }

  return (
    <div className='currency-converter'>
      <h5>Currency converter
        {isFetching &&
          <span className="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span>
        }
      </h5>
      <CurrencyConverterForm price={price} onCurrencyChange={onCurrencyChange} />
    </div>
  )
}

const mapState = (state: TRootState): TMapState => ({
  price: priceSelector(state),
  isFetching: isFetchingSelector(state),
})

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, { getPrice })(CurrencyConverter)