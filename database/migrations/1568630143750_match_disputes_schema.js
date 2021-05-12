'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchDisputesSchema extends Schema {
  up () {
    this.table('match_disputes', (table) => {
      table.boolean('is_resolwed').defaultTo(false).notNullable().after('description');
    })
  }

  down () {
    this.table('match_disputes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MatchDisputesSchema
