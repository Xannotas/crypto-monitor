import { TCoinCode } from './../types';
import { instance } from './constants';

export default {
  getCoinInfo: (coinCode: TCoinCode, targetCoinCode: TCoinCode) => {
    const url = `pricemultifull?fsyms=${coinCode}&tsyms=${targetCoinCode}`
    return instance.get(url)
      .then(res => res)
      .catch(e => {
        console.error(e)
      })
  },
  getCoinsBaseInfo: (limit: number = 100, targetCoinCode: TCoinCode) => {
    const url = `top/volumes?extraParams=https:%2F%2Fwww.cryptocompare.com&limit=${limit}&tsym=${targetCoinCode}`
    return instance.get(url)
      .then(res => res)
      .catch(e => {
        console.error(e)
      })
  }
}