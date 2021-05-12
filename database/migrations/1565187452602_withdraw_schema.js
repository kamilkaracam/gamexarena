'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawSchema extends Schema {
  up () {
    this.table('withdraws', (table) => {
      table.integer('transaction_id').unsigned().after('amount');
    })
  }

  down () {
    this.table('withdraws', (table) => {
      // reverse alternations
    })
  }
}

module.exports = WithdrawSchema
