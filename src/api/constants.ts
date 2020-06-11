import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data/'
})