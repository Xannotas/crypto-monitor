import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'
import logoPng from './../../assets/header-logo.png'

type TProps = {

}

const Header: React.FC<TProps> = () => {
  return (
    <div className='header'>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Link to='/home' className='header-logo'>
              <img src={logoPng} alt=""/>
            </Link>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header
