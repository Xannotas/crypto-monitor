import { TCoinCode } from '../types';
import axios from 'axios'
import { BASE_URL } from './constants';

export default {
  getTopListByMarketCap: (limit: number = 10, targetCoin: TCoinCode = 'USD') => {
    const url = `${BASE_URL}top/mktcapfull?limit=${limit}&tsym=${targetCoin}`

    return axios.get(url).then(res => res).catch(e => {
      console.error(e)
    })
  },
  getTopListByTierVolume: (limit: number = 10, targetCoin: TCoinCode) => {
    const url = `${BASE_URL}top/totaltoptiervolfull?limit=${limit}&tsym=${targetCoin}`

    return axios.get(url).then(res => res).catch(e => {
      console.error(e)
    })
  },
  
}