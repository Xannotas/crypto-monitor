import React, { useEffect, useState} from 'react'
import { connect } from 'react-redux'

import './currencyConverter.scss'
import { TCoinCode } from '../../utils/types'
import { TRootState } from '../../store'
import {
  priceSelector,
  isFetchingSelector,
  currencyCodeSelector,
  currencyTargetCodeSelector,
} from '../../store/currencyConverter/selectors'
import { getPrice } from '../../store/currencyConverter/actions'

import { Loader, CurrencyConverterForm } from '../../components'

type TMapState = {
  price: number
  isFetching: boolean
  currencyCode: TCoinCode
  currencyTargetCode: TCoinCode
}

type TMapDispatch = {
  getPrice: (currencyCode: TCoinCode, currencyTargetCode: TCoinCode) => void
}

type TProps = TMapState & TMapDispatch

const CurrencyConverter: React.FC<TProps> = ({
  price,
  getPrice,
  isFetching,
  currencyCode,
  currencyTargetCode,
}) => {

  const [activeFieldId, setActiveFieldId] = useState<number | null>(null)

  useEffect(() => {
    getPrice(currencyCode, currencyTargetCode)
  }, []) // eslint-disable-line

  const onSetActiveFieldId = (id : number) => {
    setActiveFieldId(id)
  }

  return (
    <div className='currency-converter'>
      <div className='d-flex justify-content-between'>
        <span className='h5'>Currency converter</span>
        {isFetching && (
          <Loader
            className='d-inline align-text-top'
            small={true}
            center={false}
          />
        )}
      </div>
      <CurrencyConverterForm
        price={price}
        currencyCode={currencyCode}
        currencyTargetCode={currencyTargetCode}
        getPrice={getPrice}
        activeFieldId={activeFieldId}
        setActiveFieldId={onSetActiveFieldId}
      />
      <div className='currency-converter__price mt-2'>
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

export default connect<TMapState, TMapDispatch, {}, TRootState>(mapState, {
  getPrice,
})(CurrencyConverter)
