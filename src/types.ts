import { currencies } from './constants';

export type TCoinCode = keyof typeof currencies

export type TCoinInfo = {
  name: TCoinCode,
  fullName: string,
  price: string,
  mktcap: string,
  imageUrl: string
}