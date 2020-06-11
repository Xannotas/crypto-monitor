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