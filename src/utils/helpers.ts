export const toRoundValue = (value: number, quality: number = 2) => {
  if (value <= 0) {
    return 0
  }

  const rank = Math.pow(10, quality)
  return Math.floor((value * rank)) / rank
}
export const trimRemain = (value: string | number, length: number = 2, symb: string = '.') => {
  const splitedText = value.toString().split(symb)
  if (splitedText[1] != null && length > 0) {
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

export const removeEndZeros = (value: string | number) => {
  const res = value.toString().match(/^[^.]+?(?=\.0*$)|^[^.]+?\..*?(?=0*$)|^[^.]*$/g)
  return res ? res[0] : value
}