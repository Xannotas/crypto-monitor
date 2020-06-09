import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './currencyConverter.scss'
import { TCoinCode } from '../../types'
import { TRootState } from '../../store'
import { priceSelector, isFetchingSelector, currencyCodeSelector, currencyTargetCodeSelector } from '../../store/currencyConverter/selectors'
import { getPrice } from '../../store/currencyConverter/actions'

import CurrencyConverterForm from '../../components/CurrencyConverterForm'
import Loader from '../../components/Loader'

type TMapState = {
  price: number,
  isFetching: boolean,
  currencyCode: TCoinCode,
  currencyTargetCode: TCoinCode,
}

type TMapDispatch = {
  getPrice: (currencyCode: TCoinCode, currencyTargetCode: TCoinCode) => void
}

type TProps = TMapState & TMapDispatch

const CurrencyConverter: React.FC<TProps> = ({ price, getPrice, isFetching, currencyCode, currencyTargetCode }) => {

  useEffect(() => {
    getPrice(currencyCode, currencyTargetCode)
  }, [])  // eslint-disable-line

  return (
    <div className='currency-converter'>
      <div className='d-flex justify-content-between'>
        <span className='h5'>Currency converter</span>
        {isFetching &&
          <Loader className='d-inline align-text-top' small={true} center={false} />
        }
      </div>
      <CurrencyConverterForm
        price={price}
        currencyCode={currencyCode}
        currencyTargetCode={currencyTargetCode}
        getPrice={getPrice}
      />
      <div className="currency-converter__price mt-2">
        {`1 ${currencyCode} = ${price} ${currencyTargetCode}`}
      </div>
    </div>
  )
}

const mapState = (state: TRootState): TMapState => ({
  price: priceSelector(state),
  isFetching: isFetchingSelector(state),
  currencyCode: currencyCodeSelector(state),
  currencyTargetCode: currencyTargetCodeSelector(state),
})

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, { getPrice })(CurrencyConverter)