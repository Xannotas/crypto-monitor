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
  
}