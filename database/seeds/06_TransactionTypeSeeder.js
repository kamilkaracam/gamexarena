'use strict'

/*
|--------------------------------------------------------------------------
| TransactionTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const TransactionType = use('App/Models/TransactionType')

class TransactionTypeSeeder {
  async run () {
    await TransactionType.createMany([
      {name: 'Deposit'},
      {name: 'Pending Deposit'},
      {name: 'Spend'},
      {name: 'Balance Add'},
      {name: 'Bonus Balance Add'},
      {name: 'Bonus Balance Removal'},
    ])
  }
}

module.exports = TransactionTypeSeeder
