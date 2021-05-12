'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up () {
    this.table('matches', (table) => {
      table.timestamp('deleted_at').nullable();
    })
  }

  down () {
    this.table('matches', (table) => {
      table.dropColumn('deleted_at');
    })
  }
}

module.exports = MatchSchema
