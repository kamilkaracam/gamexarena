'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentsSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('currency_id').unsigned().notNullable()
      table.float('amount').unsigned().notNullable()
      table.boolean('is_approved').defaultTo(true).notNullable()
      table.json('raw_response')
      table.timestamps()

      table.foreign('user_id').references('users.id')
      table.foreign('currency_id').references('currencies.id')
    })
  }

  down () {
    this.drop('payments')
  }
}

module.exports = PaymentsSchema
