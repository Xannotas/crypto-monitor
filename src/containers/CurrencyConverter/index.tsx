import React from 'react'
import CurrencyConverterForm from '../../components/CurrencyConverterForm'

import './currencyConverter.scss'

const CurrencyConverter = () => {

  return (
    <div className='currency-converter'>
      <h5>Currency converter</h5>
      <CurrencyConverterForm />
    </div>
  )
}

export default CurrencyConverter
