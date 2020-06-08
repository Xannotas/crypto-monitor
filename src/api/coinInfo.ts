import { TCoinCode } from './../types';
import axios from 'axios'
import { BASE_URL } from './constants';

export default {
  getCoinInfo: (coinCode: TCoinCode, targetCoinCode: TCoinCode) => {
    const url = `${BASE_URL}pricemultifull?fsyms=${coinCode}&tsyms=${targetCoinCode}`
    return axios.get(url).then(({ data }) => data).catch(e => {
      console.error(e)
    })
  }
}