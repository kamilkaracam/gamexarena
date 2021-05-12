'use strict'

/*
|--------------------------------------------------------------------------
| CurrencySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Currency = use('App/Models/Currency')

class CurrencySeeder {
  async run() {
    await Currency.createMany([
      {
        name: 'Euro',
        symbol: '€',
        code: 'EUR',
        is_active: true,
      },
      {
        name: 'United States Dollar',
        symbol: '$',
        code: 'USD',
      },
      {
        name: 'Turkish Lira',
        symbol: '₺',
        code: 'TRY'
      }
    ])
  }
}

module.exports = CurrencySeeder
