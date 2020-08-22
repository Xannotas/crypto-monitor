import { currencies } from './constants'

export type TCoinCode = keyof typeof currencies

export type TCoinInfo = {
  code: TCoinCode
  name: string
  toSymbol: string
  price: number | string
  mktcap: string
  directVol: string
  totalVol: string
  imageUrl: string
  priceDirection?: number
  lastPriceUpdate?: number
  market?: string
}

export type TCoinFullInfo = TCoinInfo & {
  toCode: TCoinCode
  changePercent24Hour: string
  change24Hour: string
  low24Hour: string
  high24Hour: string
  supply: string
}

export type TCoinHistoryMode = '1h' | '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | '3y'

export type TCoinHistroryDataElement = {
  formatedDate: string
  fullDate: string
  price: number
}