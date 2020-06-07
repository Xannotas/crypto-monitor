import React, { useState, useMemo } from 'react'

import './currencyConverterForm.scss'
import { TCoinCode } from '../../types'
import { currencies } from '../../constants'

import Input from '../Input'
import Select from '../Select'

const CurrencyConverterForm = () => {
  const [firstFieldValue, setFirstFieldValue] = useState<string>('')
  const [secondFieldValue, setSecondFieldValue] = useState<string>('')
  const [firstCurrency, setFirstCurrency] = useState<TCoinCode>('BTC')
  const [secondCurrency, setSecondCurrency] = useState<TCoinCode>('USD')

  const options: JSX.Element[] = useMemo(() => Object.entries(currencies).map(([key, value]) => (
    <option key={key} value={key}>{value}</option>
  )), [currencies]) // eslint-disable-line

  return (
    <div className='converter'>
      <div className="converter-field input-group mt-2">
        <Input value={firstFieldValue} onChange={setFirstFieldValue} pattern={/[0-9]*/gi} />
        <Select value={firstCurrency} onChange={(value: string) => setFirstCurrency(value as TCoinCode)} options={options} />
      </div>

      <div className="converter-field input-group mt-2">
        <Input value={secondFieldValue} onChange={setSecondFieldValue} pattern={/[0-9]*/gi} />
        <Select value={secondCurrency} onChange={(value: string) => setSecondCurrency(value as TCoinCode)} options={options} />
      </div>
    </div>
  )
}

export default CurrencyConverterForm
