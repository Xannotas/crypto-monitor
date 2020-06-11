import { TCoinCode } from './../types';
import { instance } from './constants';

export default {
  getPrice: (coin: TCoinCode, targetCoin: TCoinCode) => {
    const url = `price?fsym=${coin}&tsyms=${targetCoin}`

    return instance.get(url)
      .then(res => res)
      .catch(e => {
        console.error(e)
      })
  }
}