import { TCoinCode } from './../types';
import axios from 'axios'
import { BASE_URL } from './constants';

export default {
  getPrice: (coin: TCoinCode, targetCoin: TCoinCode) => {
    const url = `${BASE_URL}price?fsym=${coin}&tsyms=${targetCoin}`

    return axios.get(url).then(res => res).catch(e => {
      console.error(e)
    })
  }
}