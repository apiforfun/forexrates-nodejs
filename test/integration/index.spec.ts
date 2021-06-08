import { Currencies, ForexExchangeRate } from '../../src'

const forexExchangeRate = new ForexExchangeRate()

forexExchangeRate.setCurrencies([
  Currencies.ZAR,
  Currencies.GBP
])
  .setBaseCurrency(Currencies.GBP)
  // .setHistoricalDate(new Date('1999-01-01'), new Date('1999-01-10'))
  // .setDate(new Date('2012-02-14'))
  .getRates()
  .then(console.log)
  .catch(console.error)
