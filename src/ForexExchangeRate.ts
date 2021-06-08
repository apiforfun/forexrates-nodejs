import { Queries } from './types/Queries'
import { Currencies } from './enums/Currencies'
import { ForexExchangeResponse } from './types/ForexExchangeResponse'

import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * ForexExchangeRate class used to query the Exchange Rates API
 */
class ForexExchangeRate {
  /**
   * The URI for particular endpoints of the Exchange Rates API
   */
  private uri: string
  /**
   * Client used to query Exchange Rates API
   */
  private client: AxiosInstance
  /**
   * Query parameters used to query the Exchange Rates API
   */
  private readonly queryParams: Queries

  /**
   * ForexExchangeRate constructor
   */
  constructor() {
    // Default URI is getting latest exchange rates
    this.uri = 'latest'

    // Query parameters
    this.queryParams = {
      base: Currencies.USD,
      symbols: [
        Currencies.USD,
        Currencies.EUR,
        Currencies.GBP
      ].toString()
    }

    // Client used to make request to API
    this.client = Axios.create({
      baseURL: 'https://api.exchangeratesapi.io'
    })
  }

  /**
   * Set the base currency for the other currencies to be converted against
   */
  public setBaseCurrency(base: Currencies): ForexExchangeRate {
    this.queryParams.base = base
    return this
  }

  /**
   * Set the currencies to convert to
   */
  public setCurrencies(currencies: Currencies[]): ForexExchangeRate {
    this.queryParams.symbols = currencies.toString()
    return this
  }

  /**
   * Set the date for which you want historical exchange rate data for. This will still use the currencies and base
   * currency set in the request
   */
  public setDate(date: Date): ForexExchangeRate {
    this.uri = this.extractDatestamp(date)
    return this
  }

  /**
   * Set the historical dates that the exchange rate data for the specific currencies provided should be returned for
   */
  public setHistoricalDate(startDate: Date, endDate: Date): ForexExchangeRate {
    this.uri = 'history'

    this.queryParams.end_at = this.extractDatestamp(endDate)
    this.queryParams.start_at = this.extractDatestamp(startDate)
    return this
  }

  /**
   * Get the exchange rates from the Exchange Rates API
   */
  public getRates(): Promise<ForexExchangeResponse> {
    /**
     * Setup Axios request configuration
     */
    const config: AxiosRequestConfig = {
      params: this.queryParams
    }

    /**
     * Format response from API into appropriately typed response
     */
    const formatResponse = (response: AxiosResponse): ForexExchangeResponse => response.data as ForexExchangeResponse

    /**
     * Tap log error and rethrow the error
     */
    const tapError = (error: Error): never => {
      throw error
    }

    // Get data from Exchange Rates API
    return this.client.get(`/${this.uri}`, config)
      .then(formatResponse)
      .catch(tapError)
  }

  /**
   * Extract the stamp yyyy-mm-dd from the given Date
   */
  private extractDatestamp(date: Date): string {
    return date.toISOString()
      .split('T')[0]
  }
}

export { ForexExchangeRate }
