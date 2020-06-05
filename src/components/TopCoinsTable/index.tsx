import React from 'react'
import { TCoinInfo } from '../../types'

import './topCoinsTable.scss'
import { Link } from 'react-router-dom'

type TProps = {
  coins: TCoinInfo[],
}

const TopCoinsTable: React.FC<TProps> = ({ coins }) => (
  <div className="top-coins">
    <h2>Top 10 crypto currency</h2>

    <table className="table top-coins-table">
      <thead>
        <tr>
          <th scope="col-2">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Market cap.</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.name}>
            <th scope="row">{++index}</th>
            <td>
              <Link to={coin.name} className='top-coins__coin-name'>
                <img className='top-coins__coin-image' src={coin.imageUrl} alt='coin logo' />
                <span className='top-coins__coin-text'>
                  <strong>{coin.name}</strong>
                  <br />
                  <small>{coin.fullName}</small>
                </span>
              </Link>
            </td>
            <td>{coin.price}</td>
            <td>{coin.mktcap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TopCoinsTable
