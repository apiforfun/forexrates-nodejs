import { Currencies } from './enums/Currencies';
import { ForexExchangeResponse } from './types/ForexExchangeResponse';
/**
 * ForexExchangeRate class used to query the Exchange Rates API
 */
declare class ForexExchangeRate {
    /**
     * The URI for particular endpoints of the Exchange Rates API
     */
    private uri;
    /**
     * Client used to query Exchange Rates API
     */
    private client;
    /**
     * Query parameters used to query the Exchange Rates API
     */
    private readonly queryParams;
    /**
     * ForexExchangeRate constructor
     */
    constructor();
    /**
     * Set the base currency for the other currencies to be converted against
     */
    setBaseCurrency(base: Currencies): ForexExchangeRate;
    /**
     * Set the currencies to convert to
     */
    setCurrencies(currencies: Currencies[]): ForexExchangeRate;
    /**
     * Set the date for which you want historical exchange rate data for. This will still use the currencies and base
     * currency set in the request
     */
    setDate(date: Date): ForexExchangeRate;
    /**
     * Set the historical dates that the exchange rate data for the specific currencies provided should be returned for
     */
    setHistoricalDate(startDate: Date, endDate: Date): ForexExchangeRate;
    /**
     * Get the exchange rates from the Exchange Rates API
     */
    getRates(): Promise<ForexExchangeResponse>;
    /**
     * Extract the stamp yyyy-mm-dd from the given Date
     */
    private extractDatestamp;
}
export { ForexExchangeRate };
//# sourceMappingURL=ForexExchangeRate.d.ts.map