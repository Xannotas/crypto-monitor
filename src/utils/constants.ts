import defaultCurrencies from '../assets/defaultCurrencies.json'

export const imagesUrlServer = 'https://www.cryptocompare.com'

export const realCurrencies = {
  USD: 'United States Dollar',
  RUB: 'Russian Ruble',
  EUR: 'Euro'
}

export let currencies = {
  ...realCurrencies,
  ...defaultCurrencies.crypto
}

export const setCurrencies = (newCurrencies: any) => {
  currencies = {
    ...realCurrencies,
    ...newCurrencies
  }
}