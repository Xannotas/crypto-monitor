import React from 'react'
import classNames from 'classnames'

import './input.scss'

type TProps = {
  value: string,
  onChange: (newValue: string) => void,

  valueType?: 'number',
  placeholder?: string,
  type?: string,
  className?: string,
}

const Input: React.FC<TProps> = ({ className, placeholder, value, onChange, type, valueType }) => {

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget.value
    if (valueType === 'number') {
      input = input.replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, '$1') // eslint-disable-line
    }
    onChange(input)
  }

  return (
    <input
      className={classNames('form-control', className)}
      placeholder={placeholder}
      type={type || 'text'}

      value={value}
      onChange={onChangeHandler}
    />
  )
}

export default Input
