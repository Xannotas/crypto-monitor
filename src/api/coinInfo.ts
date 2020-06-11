import { TCoinCode, TCoinHistoryMode } from './../types';
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
  },

  getCoinHistoryData: (coinCode: TCoinCode, targetCoinCode: TCoinCode, history: TCoinHistoryMode) => {
    const historyUrls = {
      '1h': `v2/histominute?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=61&tryConversion=false&tsym=${targetCoinCode}`,
      '1d': `v2/histominute?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=1450&tryConversion=false&tsym=${targetCoinCode}`,
      '1w': `v2/histohour?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=169&tryConversion=false&tsym=${targetCoinCode}`,
      '1m': `v2/histohour?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=726&tryConversion=false&tsym=${targetCoinCode}`,
      '3m': `v2/histoday?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=91&tryConversion=false&tsym=${targetCoinCode}`,
      '6m': `v2/histoday?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=181&tryConversion=false&tsym=${targetCoinCode}`,
      '1y': `v2/histoday?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=366&tryConversion=false&tsym=${targetCoinCode}`,
      '3y': `v2/histoday?aggregate=1&e=CCCAGG&extraParams=https:%2F%2Fwww.cryptocompare.com&fsym=${coinCode}&limit=1106&tryConversion=false&tsym=${targetCoinCode}`
    }

    return instance.get(historyUrls[history])
      .then(res => res)
      .catch(e => {
        console.error(e)
      })
  }
}