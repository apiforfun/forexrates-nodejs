import * as nock from 'nock'

import { Currencies, ForexExchangeRate } from '../../src'

import * as successDefaultResponse from '../samples/success-default-response.json'
import * as successSetDateResponse from '../samples/success-set-date-response.json'
import * as successSetBaseResponse from '../samples/success-set-base-response.json'
import * as successSetCurrenciesResponse from '../samples/success-set-currencies-response.json'
import * as successSetHistoricalResponse from '../samples/success-set-historical-response.json'

describe('ForexExchangeRate', () => {
  const base = 'https://api.exchangeratesapi.io'

  let forexExchangeRate: ForexExchangeRate

  beforeEach(() => {
    forexExchangeRate = new ForexExchangeRate()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('#setBaseCurrency', () => {
    const baseCurrency = Currencies.GBP

    it('returns an instance of `ForexExchangeRate`', () => {
      return forexExchangeRate.setBaseCurrency(baseCurrency)
        .should.be.instanceof(ForexExchangeRate)
    })
  })

  describe('#setCurrencies', () => {
    const currencies = [
      Currencies.GBP
    ]

    it('returns an instance of `ForexExchangeRate`', () => {
      return forexExchangeRate.setCurrencies(currencies)
        .should.be.instanceof(ForexExchangeRate)
    })
  })

  describe('#setDate', () => {
    const date = new Date()

    it('returns an instance of `ForexExchangeRate`', () => {
      return forexExchangeRate.setDate(date)
        .should.be.instanceof(ForexExchangeRate)
    })
  })

  describe('#setHistoricalDates', () => {
    const endDate = new Date('1999-01-31')
    const startDate = new Date('1999-01-01')

    it('returns an instance of `ForexExchangeRate`', () => {
      return forexExchangeRate.setHistoricalDate(startDate, endDate)
        .should.be.instanceof(ForexExchangeRate)
    })
  })

  describe('#getRates', () => {
    it('resolves an `ForexExchangeResponse` with default date, base and currencies', () => {
      nock(base)
        .get('/latest?base=USD&symbols=USD,EUR,GBP')
        .reply(200, successDefaultResponse)

      return forexExchangeRate.getRates()
        .should.become(successDefaultResponse)
    })

    it('resolves an `ForexExchangeResponse` with historical date and default base and currencies', () => {
      const dateValue = '2013-06-20'
      const date = new Date(dateValue)

      nock(base)
        .get(`/${dateValue}?base=USD&symbols=USD,EUR,GBP`)
        .reply(200, successSetDateResponse)

      return forexExchangeRate.setDate(date)
        .getRates()
        .should.become(successSetDateResponse)
    })

    it('resolves an `ForexExchangeResponse` with set base and default date and currencies', () => {
      const currency = Currencies.ZAR

      nock(base)
        .get('/latest?base=ZAR&symbols=USD,EUR,GBP')
        .reply(200, successSetBaseResponse)

      return forexExchangeRate.setBaseCurrency(currency)
        .getRates()
        .should.become(successSetBaseResponse)
    })

    it('resolves an `ForexExchangeResponse` with set currencies and default date and base', () => {
      const currencies = [
        Currencies.CHF,
        Currencies.SEK
      ]

      nock(base)
        .get('/latest?base=USD&symbols=CHF,SEK')
        .reply(200, successSetCurrenciesResponse)

      return forexExchangeRate.setCurrencies(currencies)
        .getRates()
        .should.become(successSetCurrenciesResponse)
    })

    it('resolves an `ForexExchangeResponse` with all currency conversions for the dates requested', () => {
      const endDate = new Date('1999-01-04')
      const startDate = new Date('1999-01-01')

      nock(base)
        .get('/history?base=USD&symbols=USD,EUR,GBP&end_at=1999-01-04&start_at=1999-01-01')
        .reply(200, successSetHistoricalResponse)

      return forexExchangeRate.setHistoricalDate(startDate, endDate)
        .getRates()
        .should.become(successSetHistoricalResponse)
    })

    it('rejects when an error occurs getting data from the API', () => {
      nock(base)
        .get('/latest?base=USD&symbols=USD,EUR,GBP')
        .replyWithError('Something strange is afoot')

      return forexExchangeRate.getRates()
        .should.be.rejectedWith(Error, 'Something strange is afoot')
    })
  })
})
