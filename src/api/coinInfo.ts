import { TCoinCode } from './../types';
import axios from 'axios'
import { BASE_URL } from './constants';

export default {
  getCoinInfo: (coinCode: TCoinCode, targetCoinCode: TCoinCode) => {
    const url = `${BASE_URL}pricemultifull?fsyms=${coinCode}&tsyms=${targetCoinCode}`
    return axios.get(url).then(res => res).catch(e => {
      console.error(e)
    })
  },
  getCoinsBaseInfo: (limit: number = 100, targetCoinCode: TCoinCode) => {
    const url = `${BASE_URL}top/volumes?extraParams=https:%2F%2Fwww.cryptocompare.com&limit=${limit}&tsym=${targetCoinCode}`
    return axios.get(url).then(res => res).catch(e => {
      console.error(e)
    })
  }
}