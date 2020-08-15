import React from 'react'
import classNames from 'classnames'

import './loader.scss'

type TProps = {
  className?: string
  center?: boolean
  small?: boolean
}

const Loader: React.FC<TProps> = ({
  className,
  center = true,
  small = false,
}) => {
  return (
    <div
      className={classNames(
        'loader',
        { 'd-flex justify-content-center': center },
        className
      )}
    >
      <div
        className={classNames('spinner-border', { 'spinner-border-sm': small })}
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}

export default React.memo(Loader)
