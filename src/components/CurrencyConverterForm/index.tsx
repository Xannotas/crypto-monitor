import React, { useState, useMemo, useEffect } from 'react'

import './currencyConverterForm.scss'
import { TCoinCode } from '../../types'
import { currencies } from '../../constants'

import Input from '../Input'
import Select from '../Select'

type TProps = {
  price: number,
  currencyCode: TCoinCode,
  currencyTargetCode: TCoinCode,
  getPrice: (currencyCode: TCoinCode, currencyTargetCode: TCoinCode) => void
}

const CurrencyConverterForm: React.FC<TProps> = ({ price, getPrice, currencyCode, currencyTargetCode }) => {
  const [firstFieldValue, setFirstFieldValue] = useState<string>('0')
  const [secondFieldValue, setSecondFieldValue] = useState<string>('0')

  const options: JSX.Element[] = useMemo(() => Object.entries(currencies).map(([key, value]) => (
    <option key={key} value={key}>{value}</option>
  )), [currencies]) // eslint-disable-line

  const changeFirstInput = (newValue: string) => {
    setFirstFieldValue(newValue)
    setSecondFieldValue((+newValue * price).toFixed(8).toString())
  }

  const changeTargetInput = (newValue: string) => {
    setSecondFieldValue(newValue)
    setFirstFieldValue(newValue === '0' ? '0' : (+newValue / price).toFixed(8).toString())
  }

  useEffect(() => {
    changeFirstInput(firstFieldValue)
  }, [currencyCode]) // eslint-disable-line

  useEffect(() => {
    changeTargetInput(secondFieldValue)
  }, [currencyTargetCode]) // eslint-disable-line

  return (
    <div className='converter'>
      <div className="converter-field input-group mt-2">
        <Input
          valueType='number'
          value={firstFieldValue}
          onChange={changeFirstInput} />

        <Select options={options} value={currencyCode}
          onChange={(value: string) => getPrice(value as TCoinCode, currencyTargetCode)}
        />
      </div>

      <div className="converter-field input-group mt-2">
        <Input
          valueType='number'
          value={secondFieldValue}
          onChange={changeTargetInput} />

        <Select options={options} value={currencyTargetCode}
          onChange={(value: string) => getPrice(currencyCode, value as TCoinCode)}
        />
      </div>
    </div>
  )
}

export default CurrencyConverterForm
