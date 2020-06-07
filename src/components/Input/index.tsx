import React from 'react'
import classNames from 'classnames'

import './input.scss'

type TProps = {
  value: string,
  onChange: (newValue: string) => void,

  placeholder?: string,
  type?: string,
  pattern?: RegExp,
  className?: string,
}

const Input: React.FC<TProps> = ({ className, pattern, placeholder, value, onChange, type }) => {

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget.value
    if (pattern && input.match(pattern)) {
      input = input.match(pattern)!.join('')

      if (input.length > 1 && input[0] === '0') {
        input = input.slice(1)
      }

      onChange(input)
    }

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
