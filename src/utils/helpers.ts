import { TCoinCode } from "./types"

export const toRoundValue = (value: number) => {
  if (value <= 0) {
    return 0
  }
  return Math.floor((value * 100)) / 100
}

export const toFixedString = (text: string, length: number = 2, symb: string = '.') => {
  const splitedText = text.toString().split(symb) || ''
  if (splitedText[1] && length > 0) {
    return `${splitedText[0]}.${splitedText[1].slice(0, length)}`
  }
  return splitedText[0]
}

export const formatCost = (cost: string, toSymbol: string, toCode: TCoinCode) => {
  const res = `${toSymbol !== toCode && toSymbol}
  ${cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
  ${toCode}`
  return res
}