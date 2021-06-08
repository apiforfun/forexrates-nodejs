import { Currencies, HistoricalRates, Rates } from '..'

/**
 * Representation of the response from the Exchange Rates API
 */
interface ForexExchangeResponse {
  /**
   * The last date the data was updated
   */
  date: string
  /**
   * Base currency to convert against
   */
  base: Currencies
  /**
   * Conversion rates against the base currency
   */
  rates: HistoricalRates | Rates
}

export { ForexExchangeResponse }
