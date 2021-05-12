'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawSchema extends Schema {
  up () {
    this.table('withdraws', (table) => {
      table.integer('currency_id').unsigned().after('amount')
      table.foreign('currency_id').references('currencies.id')
    })
  }

  down () {
    this.table('withdraws', (table) => {
      // reverse alternations
    })
  }
}

module.exports = WithdrawSchema
