import { TCoinCode } from './../utils/types'
import { dispatch } from './../store/index'
import { changeCoinPrice } from './../store/topCoinsList/actions/index'

const setupSocket = (coinsCode: TCoinCode[], targetCoinCode: TCoinCode) => {
  const apikey = '9dc344e1a579aeaf12130d3c8876099d14f11dc1058e9e29a000d4d966a00cca'
  const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apikey}`)

  const subs = coinsCode.map((coin) => `2~Coinbase~${coin}~${targetCoinCode}`)

  socket.onopen = () => {
    // console.log('OPEN')
    socket.send(
      JSON.stringify({
        action: 'SubAdd',
        subs,
      })
    )
  }

  socket.onmessage = (event) => {
    // console.log('MESSAGE')
    const data = JSON.parse(event.data)
    switch (data.TYPE) {
      case '2':
        if (data.PRICE) {
          dispatch(
            changeCoinPrice({
              coinCode: data.FROMSYMBOL as TCoinCode,
              price: data.PRICE as number,
            })
          )
        }
        break
      default: break;
    }
  }

  socket.onclose = () => {
    // console.log('CLOSE')
    socket.send(
      JSON.stringify({
        action: 'SubRemove',
        subs,
      })
    )
  }

  return socket
}

export default setupSocket
