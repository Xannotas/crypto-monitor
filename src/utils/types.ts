import { currencies } from './constants';

export type TCoinCode = keyof typeof currencies

export type TCoinInfo = {
  code: TCoinCode,
  name: string,
  price: string,
  mktcap: string,
  directVol: string,
  totalVol: string,
  imageUrl: string
}

export type TCoinFullInfo = TCoinInfo & {
  toSymbol: string,
  toCode: string,
  changePercent24Hour: string,
  change24Hour: string,
  low24Hour: string,
  high24Hour: string,
  supply: string,
}

export type TCoinHistoryMode = '1h' | '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | '3y'

export type TCoinHistroryDataElement = {
  title: string,
  price: number
}