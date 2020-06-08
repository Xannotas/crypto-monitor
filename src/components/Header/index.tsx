import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'

type TProps = {

}

const Header: React.FC<TProps> = () => {

  const logoUrl = 'https://uploads-ssl.webflow.com/5d5f02be87f780005e708e1f/5db01a351c624d3ecf624e6d_reactlogo.jpg'

  return (
    <div className='header'>
      <div className="container">
        <div className="header-logo">
          <Link to='/'>
            <img src={logoUrl} alt="logo" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
