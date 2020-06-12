import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'
import logoPng from './../../assets/header-logo.png'
import { TCoinCode } from '../../utils/types'
import { realCurrencies } from '../../utils/constants'

import Select from '../Select'

type TProps = {
  targetCoinCode: TCoinCode,
  onTargetCoinChange: (code: TCoinCode) => void
}

const Header: React.FC<TProps> = ({ targetCoinCode, onTargetCoinChange }) => {
  const customCurrencies: TCoinCode[] = [
    ...Object.keys(realCurrencies) as TCoinCode[],
    'BTC',
    'ETH',
    'LTC'
  ]

  const oprions = customCurrencies.map(code => (
    <option key={code} value={code}>{code}</option>
  ))

  return (
    <div className='header'>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Link to='/home' className='header-logo'>
              <img src={logoPng} alt="" />
            </Link>
          </div>
          <div className="col-md-9 text-right">
            <div className="d-inline-block">
              <Select value={targetCoinCode} options={oprions} onChange={(value: string) => onTargetCoinChange(value as TCoinCode)} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header
