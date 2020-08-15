import React from 'react'
import classNames from 'classnames'

type TProps = {
  value: string
  onChange: (newValue: string) => void
  options: JSX.Element[]

  className?: string
}

const Select: React.FC<TProps> = ({ value, onChange, options, className }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value)
  }

  return <select
    className={classNames('custom-select', className)}
    value={value}
    onChange={onChangeHandler}
  >
    {options}
  </select>
}

export default React.memo(Select)
