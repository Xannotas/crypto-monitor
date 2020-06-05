export type TCoinCode = 'USD' | 'RUB' | 'EUR' |
  'BTC' | 'ETH' | 'ADA' | 'BCH' | 'XRP' |
  'EOS' | 'LTS' | 'ETC' | 'BSV' | 'TRX' |
  'XLM' | 'BNB' | 'GNT' | 'LINK' | 'OKB' |
  'XTZ' | 'NEO' | 'STORM' | 'ZEC' | 'DASH' |
  'VET' | 'ATOM' | 'ONT' | 'THETA' | 'QTUM' |
  'USDT' | 'ZIL' | 'OMG' | 'KNC' | 'TRUE' |
  'MCO' | 'DEP' | 'XMR' | 'MIOTA' | 'HYN' |
  'CTXC' | 'IOST' | 'MATIC' | 'CRO' | 'BAT' |
  'TFUEL' | 'ICX' | 'GTO' | 'HBAR' | 'SWFTC' |
  'QKC' | 'USDC' | 'TT' | 'LRC' | 'KAVA' |
  'ELF' | 'HT' | 'PAX' | 'NULS' | 'ZRX' |
  'BTM' | 'XEM' | 'MANA' | 'ALGO' | 'BTT' |
  'SNT' | 'LTO' | 'EDO' | 'MONA' | 'SC' |
  'CVC' | 'GAS' | 'BAND' | 'ZYN' | 'HDAO' |
  'ITC' | 'REP' | 'ENJ' | 'TUSD' | 'MKR' |
  'NAS' | 'MSDT' | 'PIXEL' | 'CHZ' | 'AST' |
  'KCASH' | 'DREP' | 'ONGAS' | 'BNT' | 'BCD' |
  'DGB' | 'SEELE' | 'OGN' | 'ABT' | 'ERD' |
  'BTG' | 'DCR' | 'MBL' | 'RVN' | 'XVG' |
  'LUNA' | 'WTC' | 'CVT' | 'PAY' | 'AION'

export type TCoinInfo = {
  name: TCoinCode,
  fullName: string,
  price: string,
  mktcap: string,
  imageUrl: string
}