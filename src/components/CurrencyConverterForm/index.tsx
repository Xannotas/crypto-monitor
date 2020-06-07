import React, { useState, useMemo } from 'react'

import './currencyConverterForm.scss'
import { TCoinCode } from '../../types'
import { currencies } from '../../constants'

import Input from '../Input'
import Select from '../Select'

type TProps = {
  price: number,
  onCurrencyChange: (currency: TCoinCode, targetCurrency: TCoinCode) => void
}

const CurrencyConverterForm: React.FC<TProps> = ({ price, onCurrencyChange }) => {
  const [firstFieldValue, setFirstFieldValue] = useState<string>('')
  const [secondFieldValue, setSecondFieldValue] = useState<string>('')

  const [firstCurrency, setFirstCurrency] = useState<TCoinCode>('BTC')
  const [secondCurrency, setSecondCurrency] = useState<TCoinCode>('USD')


  const options: JSX.Element[] = useMemo(() => Object.entries(currencies).map(([key, value]) => (
    <option key={key} value={key}>{value}</option>
  )), [currencies]) // eslint-disable-line

  const onInputChange = (newValue: string, setCurrentFieldValue: Function, setTargetFieldValue: Function) => {
    setCurrentFieldValue(newValue)
  }

  return (
    <div className='converter'>
      <div className="converter-field input-group mt-2">
        <Input pattern={/[0-9]*/gi} value={firstFieldValue} onChange={(newValue) => onInputChange(newValue, setFirstFieldValue, setSecondFieldValue)} />

        <Select options={options} value={firstCurrency}
          onChange={(value: string) => {
            onCurrencyChange(value as TCoinCode, secondCurrency)
            setFirstCurrency(value as TCoinCode)
          }} />
      </div>

      <div className="converter-field input-group mt-2">
        <Input pattern={/[0-9]*/gi} value={secondFieldValue} onChange={(newValue) => onInputChange(newValue, setSecondFieldValue, setFirstFieldValue)} />

        <Select options={options} value={secondCurrency}
          onChange={(value: string) => {
            onCurrencyChange(firstCurrency, value as TCoinCode)
            setSecondCurrency(value as TCoinCode)
          }} />
      </div>
    </div>
  )
}

export default CurrencyConverterForm
