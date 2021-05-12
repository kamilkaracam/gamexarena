'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up() {
    this.table('matches', (table) => {
      table.integer('currency_id').unsigned().notNullable().after('wager')
      table.foreign('currency_id').references('currencies.id')
    })
  }

  down() {
    this.table('matches', (table) => {
      table.dropForeign('currency_id')
      table.dropColumn('currency_id')
    })
  }
}

module.exports = MatchSchema
