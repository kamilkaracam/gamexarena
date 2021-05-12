'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionTypeSchema extends Schema {
  up () {
    this.create('transaction_types', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('slug', 100).notNullable()
    })
  }

  down () {
    this.drop('transaction_types')
  }
}

module.exports = TransactionTypeSchema
