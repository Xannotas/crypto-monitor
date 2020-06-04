import { TCoinCode } from './../types';
import axios from 'axios'
import { BASE_URL } from './constants';

export default {
  getPrice: (coin: TCoinCode, targetCoins: TCoinCode[]) => {
    const url = `${BASE_URL}price?fsym=${coin}&tsyms=${targetCoins.join(',')}`

    return axios.get(url).then(({ data }) => data).catch(e => {
      console.error(e)
    })
  }
}