import React from 'react'
import classNames from 'classnames'

type TProps = {
  className?: string
  center?: boolean
}

const Loader: React.FC<TProps> = ({ className, center = true }) => {
  return (
    <div className={classNames({"d-flex justify-content-center" : center}, className)}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loader
