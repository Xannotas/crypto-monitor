import React from 'react'
import classNames from 'classnames'

import './input.scss'

type TProps = {
  value: string
  onChange: (newValue: string) => void

  valueType?: 'number'
  placeholder?: string
  type?: string
  className?: string
}

const Input: React.FC<TProps> = ({
  className,
  placeholder,
  value,
  onChange,
  type = 'text',
  valueType,
}) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget.value
    if (valueType === 'number') {
      input = input
        .replace(/[^.\d]+/g, '') 
        .replace(/^0{2}/g, '0')
        .replace(/^0{1}\d+/g, input.slice(-1)) // 0n -> n
        .replace(/^([^.]*\.)|\./g, '$1') // .. -> .
    }
    onChange(input)
  }

  return (
    <input
      className={classNames('form-control', className)}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChangeHandler}
    />
  )
}

export default Input
