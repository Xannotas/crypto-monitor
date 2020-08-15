export const toRoundValue = (value: number) => {
  if (value <= 0) {
    return 0
  }
  return Math.floor((value * 100)) / 100
}

export const trimRemain = (value: string | number, length: number = 2, symb: string = '.') => {
  const splitedText = value.toString().split(symb)
  if (splitedText[1] && length > 0 && splitedText[1].length > 0) {
    return `${splitedText[0]}${symb}${splitedText[1].slice(0, length)}`
  }
  return splitedText[0]
}

export const formatCost = (value: string | number, replaceChar = ',') => {
  const splitedCost = value.toString().split('.')
  splitedCost[0] = splitedCost[0].replace(/(\d)(?=((\d{3})+(?!\d)))/gi, `$1${replaceChar}`)
  if(splitedCost[1]) {
    return `${splitedCost[0]}.${splitedCost[1]}`
  }

  return splitedCost[0]
}