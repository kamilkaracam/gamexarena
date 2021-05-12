'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up() {
    this.create('transactions', (table) => {
      table.uuid('uuid').notNullable().primary()
      table.integer('user_id').unsigned().notNullable()
      table.integer('transaction_type_id').unsigned().notNullable()
      table.integer('transaction_description_id').unsigned().notNullable()
      table.integer('currency_id').unsigned().notNullable()
      table.integer('payment_id').unsigned()
      table.float('amount').unsigned().notNullable()
      table.float('balance').unsigned().notNullable()
      table.float('bonus_balance').unsigned().notNullable()
      table.boolean('is_success').defaultTo(true).notNullable()
      table.boolean('is_approved').defaultTo(true).notNullable()
      table.timestamps()

      table.foreign('user_id').references('users.id')
      table.foreign('transaction_type_id').references('transaction_types.id')
      table.foreign('transaction_description_id').references('transaction_descriptions.id')
      table.foreign('currency_id').references('currencies.id')
      table.foreign('payment_id').references('payments.id')
    })
  }

  down() {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
