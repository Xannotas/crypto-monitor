import { TCoinCode } from '../utils/types';
import { instance } from './constants';

export default {
  getTopListByMarketCap: (limit: number = 10, targetCoin: TCoinCode) => {
    const url = `top/mktcapfull?limit=${limit}&tsym=${targetCoin}`

    return instance.get(url)
      .then(res => res)
      .catch(e => {
        console.error(e)
      })
  },
  getTopListByTierVolume: (limit: number = 10, targetCoin: TCoinCode, page : number = 0) => {
    const url = `top/totaltoptiervolfull?limit=${limit}&page=${page}&tsym=${targetCoin}`

    return instance.get(url)
      .then(res => res)
      .catch(e => {
        console.error(e)
      })
  }
}