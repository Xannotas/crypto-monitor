import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'
import logoPng from './../../assets/header-logo.png'
import { TCoinCode } from '../../utils/types'

import { Select } from '../'

type TProps = {
  targetCoinCode: TCoinCode
  onTargetCoinChange: (code: TCoinCode) => void
}

const Header: React.FC<TProps> = ({ targetCoinCode, onTargetCoinChange }) => {
  const customCurrencies: TCoinCode[] = [
    'BTC',
    'USD',
  ]

  const oprions = customCurrencies.map((code) => (
    <option key={code} value={code}>
      {code}
    </option>
  ))

  return (
    <div className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-2'>
            <Link to='/home' className='header-logo'>
              <img src={logoPng} alt='' />
            </Link>
          </div>
          <div className='col-6 col-md-10'>
            <div className='header-menu'>
              <Link to='/home' className='header-menu__item'>
                {' '}
                Home
              </Link>
              <Link to='/coins' className='header-menu__item'>
                {' '}
                Coins
              </Link>

              <div className='header-menu__item'>
                <Select
                  value={targetCoinCode}
                  options={oprions}
                  onChange={(value: string) =>
                    onTargetCoinChange(value as TCoinCode)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header)
