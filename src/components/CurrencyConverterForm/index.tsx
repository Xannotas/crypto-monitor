import React, { useState, useMemo } from 'react'

import './currencyConverterForm.scss'
import { TCoinCode } from '../../types'
import { currencies } from '../../constants'

import Input from '../Input'
import Select from '../Select'

type TProps = {
  price: number,
  defaultCurrency: TCoinCode,
  defaultTargetCurrency: TCoinCode,
  onCurrencyChange: (currency: TCoinCode, targetCurrency: TCoinCode) => void
}

const CurrencyConverterForm: React.FC<TProps> = ({ price, onCurrencyChange, defaultCurrency, defaultTargetCurrency }) => {
  const [firstFieldValue, setFirstFieldValue] = useState<string>('')
  const [secondFieldValue, setSecondFieldValue] = useState<string>('')

  const [firstCurrency, setFirstCurrency] = useState<TCoinCode>(defaultCurrency)
  const [secondCurrency, setSecondCurrency] = useState<TCoinCode>(defaultTargetCurrency)

  const options: JSX.Element[] = useMemo(() => Object.entries(currencies).map(([key, value]) => (
    <option key={key} value={key}>{value}</option>
  )), [currencies]) // eslint-disable-line

  const onInputChange = (newValue: string, setCurrentFieldValue: Function, setTargetFieldValue: Function, targetPrice: number) => {
    setCurrentFieldValue(newValue)
    setTargetFieldValue(targetPrice)
  }

  return (
    <div className='converter'>
      <div className="converter-field input-group mt-2">
        <Input
          valueType='number'
          value={firstFieldValue}
          onChange={(newValue) => onInputChange(newValue, setFirstFieldValue, setSecondFieldValue, +newValue * price)} />

        <Select options={options} value={firstCurrency}
          onChange={(value: string) => {
            onCurrencyChange(value as TCoinCode, secondCurrency)
            setFirstCurrency(value as TCoinCode)
          }}
        />
      </div>

      <div className="converter-field input-group mt-2">
        <Input
          valueType='number'
          value={secondFieldValue}
          onChange={(newValue) => onInputChange(newValue, setSecondFieldValue, setFirstFieldValue, +newValue / price)} />

        <Select options={options} value={secondCurrency}
          onChange={(value: string) => {
            onCurrencyChange(firstCurrency, value as TCoinCode)
            setSecondCurrency(value as TCoinCode)
          }}
        />
      </div>
    </div>
  )
}

export default CurrencyConverterForm
