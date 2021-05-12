'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionDescriptionSchema extends Schema {
  up () {
    this.create('transaction_descriptions', (table) => {
      table.increments()
      table.text('text')
    })
  }

  down () {
    this.drop('transaction_descriptions')
  }
}

module.exports = TransactionDescriptionSchema
