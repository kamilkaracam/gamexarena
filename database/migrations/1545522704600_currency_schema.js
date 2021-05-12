'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CurrencySchema extends Schema {
  up() {
    this.create('currencies', (table) => {
      table.increments()
      table.string('name', 20).notNullable()
      table.string('symbol', 1).notNullable()
      table.string('code', 3).notNullable().unique()
      table.boolean('is_active').defaultTo(false).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('currencies')
  }
}

module.exports = CurrencySchema
