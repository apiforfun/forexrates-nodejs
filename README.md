# Forex Rates
[![NPM Version](https://badge.fury.io/js/theforexapi_001.svg)](https://badge.fury.io/js/theforexapi_001.svg)
[![Build Status](https://travis-ci.org/ToeFungi/forex-rates.svg?branch=master)](https://travis-ci.org/ToeFungi/forex-rates)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=apiforfun_forexrates-nodejs&metric=alert_status)](https://sonarcloud.io/dashboard?id=forex-rates)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=apiforfun_forexrates-nodejs&metric=coverage)](https://sonarcloud.io/dashboard?id=apiforfun_forexrates-nodejs)

This is an unofficial client for the [Forex Rates API](https://theforexapi.com/) and provides easy to use and 
implement, promise based functionality to retrieve forex rates including historical data from the API and return it
in an easy to use model. All functionality provided by the API has been encapsulated.

The codebase is covered by unit tests and has code analysis through sonar to help ensure no bugs creep in. There is 
documentation illustrating implementation of the code and how to get started should you wish to contribute.

## Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  - [Setting base currency](#setbasecurrencystring)
  - [Setting exchange currencies](#setcurrenciesarraycurrencies)
  - [Setting specific date](#setdatedate)
  - [Setting historical date range](#sethistoricaldatedate-date)
  - [Get forex rates](#getrates)
  - [Chaining methods](#chaining-setters)
  - [Responses](#responses)
- [Supported Currencies](#supported-currencies)
- [Unit Tests](#running-tests)
- [Issues](#issues)
- [Contributions](#contributions)
- [License](#license)

## Getting Started
This is how to get a copy of this working locally. The only requirement is that Node is installed on the base machine.
```bash
$ git clone git@github.com:apiforfun/forexrates-nodejs.git
$ cd forexrates-nodejs
$ npm i
```

## Installation
Install this Forex Rates API client via npm.
```bash
$ npm i --save forex-rates
```
This project only has a single dependency.

## Usage
Import the file ForexExchangeRate client and instantiate a new instance.
```typescript
import { ForexExchangeRate } from 'forex-rates'

const forexExchangeRate = new ForexExchangeRate()
```

#### .setBaseCurrency(string)
Set the base currency that the returned currencies will be converted against. You can use the existing enumerated list 
of supported currencies to select this base currency.
```typescript
import { Currencies } from 'forex-rates'

forexExchangeRate.setBaseCurrency(Currencies.GBP)
```

#### .setCurrencies(array<Currencies>) 
Set the currencies you want to be returned from the API. These currency will be converted against the currency 
stipulated as the base above, alternatively it will default to have a base of USD. Use the existing enumerated list of 
supported currencies to populate the requested list of currencies.
```typescript
import { Currencies } from 'forex-rates'

const currencies: Currencies[] = [
    Currencies.USD,
    Currencies.ZAR
]

forexExchangeRate.setCurrencies(currencies)
```

#### .setDate(Date)
Set the date for which you want the exchange rate data from. This can be any date as far back to 1999. It accepts a
standard JavaScript Date object.
```typescript
const date = new Date('2012-01-31')

forexExchangeRate.setDate(date)
```

#### .setHistoricalDate(Date, Date)
Set the historical dates for which the forex rates should be returned. Note that these rates may not be available for
each day in the requested time period. The API provides historical data dated back to 1999.
```typescript
const endDate = new Date('1999-01-04')
const startDate = new Date('1999-01-01')

forexExchangeRate.setHistoricalDate(startDate, endDate)
```

#### .getRates()
Generates and submits the request to the API and returns a typed response object within a promise containing the data 
that has been requested.
```typescript
import { ForexExchangeResponse } from 'forex-rates'

forexExchangeRate.getRates()
  .then((response: ForexExchangeResponse) => console.log({
    base: response.base,
    date: response.date,
    rates: response.rates
  }))
```

#### Chaining Setters
All of the appropriate setters contained in this library return the instance of the `ForexExchangeRate` client that the
method call is being executed on. This means that you can chain the setters for an easier and cleaner implementation.
```typescript
import { ForexExchangeRate, Currencies, ForexExchangeResponse } from 'forex-rates'

const date = new Date('2012-01-30')
const currencies: Currencies[] = [
    Currencies.USD,
    Currencies.ZAR
]

const forexExchangeRate = new ForexExchangeRate()

forexExchangeRate.setBaseCurrency(Currencies.GBP)
  .setCurrencies(currencies)
  .setDate(date)
  .getRates()
  .then((response: ForexExchangeResponse) => console.log({
    base: response.base,
    date: response.date,
    rates: response.rates
  }))
```

#### Responses
There is a standardised response type of `ForexExchangeResponse` which is altered depending on the request. In the event of
querying historical data, the `rates` within `ForexExchangeResponse` will contain the type of `HistoricalRates` whereas any
other request will contain the type of `Rates`.

## Supported Currencies
Only currencies listed on the 
[European Central Bank](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html) 
are supported by this client at the moment. The following is a list of the currently available and supported currencies.
The rates of these currencies are updated periodically. 

![](https://www.countryflags.io/au/shiny/16.png) Australian Dollar (AUD)<br/>
![](https://www.countryflags.io/br/shiny/16.png) Brazilian Real (BRL)<br/>
![](https://www.countryflags.io/gb/shiny/16.png) British Pound Sterline (GBP)<br/>
![](https://www.countryflags.io/bg/shiny/16.png) Bulgarian Lev (BGN)<br/>
![](https://www.countryflags.io/ca/shiny/16.png) Canadian Dollar (CAD)<br/>
![](https://www.countryflags.io/cn/shiny/16.png) Chinese Yuan Renminbi (CNY)<br/>
![](https://www.countryflags.io/hr/shiny/16.png) Croatian Kuna (HRK)<br/>
![](https://www.countryflags.io/cz/shiny/16.png) Czech Koruna (CZK)<br/>
![](https://www.countryflags.io/dk/shiny/16.png) Danish Krone (DKK)<br/>
![](https://www.countryflags.io/eu/shiny/16.png) Euro (EUR)<br/>
![](https://www.countryflags.io/hk/shiny/16.png) Hong Kong Dollar (HKD)<br/>
![](https://www.countryflags.io/hu/shiny/16.png) Hungarian Forint (HUF)<br/>
![](https://www.countryflags.io/is/shiny/16.png) Icelandic Króna (ISK)<br/>
![](https://www.countryflags.io/id/shiny/16.png) Indonesian Rupiah (IDR)<br/>
![](https://www.countryflags.io/in/shiny/16.png) Indian Rupee (INR)<br/>
![](https://www.countryflags.io/il/shiny/16.png) Israeli Shekel (ILS)<br/>
![](https://www.countryflags.io/jp/shiny/16.png) Japanese Yen (JPY)<br/>
![](https://www.countryflags.io/my/shiny/16.png) Malaysian Ringgit (MYR)<br/>
![](https://www.countryflags.io/mx/shiny/16.png) Mexican Peso (MXN)<br/>
![](https://www.countryflags.io/nz/shiny/16.png) New Zealand Dollar (NZD)<br/>
![](https://www.countryflags.io/no/shiny/16.png) Norwegian Krone (NOK)<br/>
![](https://www.countryflags.io/ph/shiny/16.png) Philippine Peso (PHP)<br/>
![](https://www.countryflags.io/pl/shiny/16.png) Polish Złoty (PLN)<br/>
![](https://www.countryflags.io/ro/shiny/16.png) Romanian Leu (RON)<br/>
![](https://www.countryflags.io/ru/shiny/16.png) Russian Rouble (RUB)<br/>
![](https://www.countryflags.io/sg/shiny/16.png) Singapore Dollar (SGD)<br/>
![](https://www.countryflags.io/za/shiny/16.png) South African Rand (ZAR)<br/>
![](https://www.countryflags.io/kr/shiny/16.png) South Korean Won (KRW)<br/>
![](https://www.countryflags.io/se/shiny/16.png) Swedish Krona (SEK)<br/>
![](https://www.countryflags.io/ch/shiny/16.png) Swiss Franc (CHF)<br/>
![](https://www.countryflags.io/th/shiny/16.png) Thai Baht (THB)<br/>
![](https://www.countryflags.io/tr/shiny/16.png) Turkish Lira (TRY)<br/>
![](https://www.countryflags.io/us/shiny/16.png) US Dollar (USD)<br/>

## Running Tests
To run tests, you should be able to simply run be able to run the following.
```bash
$ npm run test
$ npm run coverage
```
The testing framework used is Mocha. Chai, Chai-as-promised, nyc and nock are used for assertions, coverage reporting
and mocking external requests, respectively. Should you make a change request, please ensure that the new changes are
appropriately covered by accompanying unit tests.

## Issues
If you find any problems while working with this library, please log an issue 
[here](https://github.com/apiforfun/forexrates-nodejs/issues) so that development can begin to rectify the 
error.

## Contributions
This project is completely open source and as such, you are invited to make contributions. Fork the project, make some
changes and make the pull request. Should you have any feedback regarding the functionality, please don't hesitate to
open an issue so this can be resolved. Please ensure that any pull requests have unit tests that cover any additional
functionality.

## License
MIT License

Copyright (c) 2021 CoolFire1231 Pickering
