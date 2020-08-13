import React, { useState, useMemo, useEffect } from 'react'

import './currencyConverterForm.scss'
import { TCoinCode } from '../../utils/types'
import { currencies } from '../../utils/constants'

import { Input, Select } from '../'

type TProps = {
  price: number
  currencyCode: TCoinCode
  currencyTargetCode: TCoinCode
  getPrice: (currencyCode: TCoinCode, currencyTargetCode: TCoinCode) => void
  activeFieldId: number | null
  setActiveFieldId: (id: number) => void
}

const CurrencyConverterForm: React.FC<TProps> = ({
  price,
  getPrice,
  currencyCode,
  currencyTargetCode,
  activeFieldId,
  setActiveFieldId,
}) => {
  const [firstFieldValue, setFirstFieldValue] = useState<string>('0')
  const [secondFieldValue, setSecondFieldValue] = useState<string>('0')

  const options: JSX.Element[] = useMemo(
    () =>
      Object.entries(currencies).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      )),
    [currencies] // eslint-disable-line
  )

  const calcFuncs = {
    mult: (newValue: string) => (+newValue * price).toString(),
    def: (newValue: string) =>
      newValue === '0' ? '0' : (+newValue / price).toString(),
  }

  const onChangeFirstInput = (newValue: string) => {
    setFirstFieldValue(newValue)
    setSecondFieldValue(calcFuncs['mult'](newValue))
    setActiveFieldId(0)
  }

  const onChangeSecondInput = (newValue: string) => {
    setSecondFieldValue(newValue)
    setFirstFieldValue(calcFuncs['def'](newValue))
    setActiveFieldId(1)
  }

  useEffect(() => {
    switch (activeFieldId) {
      case 0:
        setSecondFieldValue(calcFuncs['mult'](firstFieldValue))
        break
      case 1:
        setFirstFieldValue(calcFuncs['def'](secondFieldValue))
        break
    }
  }, [currencyCode, currencyTargetCode]) // eslint-disable-line

  return (
    <div className='converter'>
      <div className='converter-field input-group mt-2'>
        <Input
          valueType='number'
          value={firstFieldValue}
          onChange={onChangeFirstInput}
        />

        <Select
          options={options}
          value={currencyCode}
          onChange={(value: string) =>
            getPrice(value as TCoinCode, currencyTargetCode)
          }
        />
      </div>

      <div className='converter-field input-group mt-2'>
        <Input
          valueType='number'
          value={secondFieldValue}
          onChange={onChangeSecondInput}
        />

        <Select
          options={options}
          value={currencyTargetCode}
          onChange={(value: string) =>
            getPrice(currencyCode, value as TCoinCode)
          }
        />
      </div>
    </div>
  )
}

export default CurrencyConverterForm
