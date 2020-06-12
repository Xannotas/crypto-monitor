import React from 'react'
import { TCoinInfo } from '../../utils/types'

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
          <th scope="col">Direct Vol</th>
          <th scope="col">Total Vol</th>
          <th scope="col">Market cap.</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.code}>
            <th scope="row">{++index}</th>
            <td>
              <Link to={`coins/${coin.code}`} className='top-coins__coin-name'>
                <img className='top-coins__coin-image' src={coin.imageUrl} alt='coin logo' />
                <span className='top-coins__coin-text'>
                  <strong>{coin.code}</strong>
                  <br />
                  <small>{coin.name}</small>
                </span>
              </Link>
            </td>
            <td>{coin.price}</td>
            <td>{coin.directVol}</td>
            <td>{coin.totalVol}</td>
            <td>{coin.mktcap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TopCoinsTable
