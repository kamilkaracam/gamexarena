'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawSchema extends Schema {
  up () {
    this.table('withdraws', (table) => {
      table.dropColumn('is_approved');
    })

    this.table('withdraws', (table) => {
      table.boolean('is_approved').defaultTo(false).notNullable().after('transaction_id');
    })

  }

  down () {
    this.table('withdraws', (table) => {
      // reverse alternations
    })
  }
}

module.exports = WithdrawSchema
