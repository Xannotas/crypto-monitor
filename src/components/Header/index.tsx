import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './header.scss'
import logoPng from './../../assets/header-logo.png'
import { TCoinCode } from '../../utils/types'
import { targetCoinCodeSelector } from '../../store/coinInfo/selectors'
import { setTargetCoinCode } from '../../store/coinInfo/actions'

import { Select, SearchField } from '../'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const customCurrencies: TCoinCode[] = ['BTC', 'USD']
  const targetCoinCode = useSelector(targetCoinCodeSelector)

  const oprions = customCurrencies.map((code) => (
    <option key={code} value={code}>{code}</option>
  ))

  return (
    <div className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-2'>
            <Link to='/home' className='header-logo'>
              <img src={logoPng} alt='logo' />
            </Link>
          </div>
          <div className='col-12 col-md-10'>
            <div className='header-menu'>
              <SearchField />
              <Link to='/home' className='header-menu__item'>Home</Link>
              <Link to='/coins' className='header-menu__item'>Coins</Link>

              <div className='header-menu__item'>
                <Select
                  value={targetCoinCode}
                  options={oprions}
                  onChange={(value: string) =>
                    dispatch(setTargetCoinCode(value as TCoinCode))
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
