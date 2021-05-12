'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up() {
    this.table('matches', (table) => {
      table.boolean('cross_platform').defaultTo(false).after('game_type_id');
      table.integer('length').after('currency_id');
      table.datetime('started_at').after('custom_rules');
      table.datetime('finished_at').after('started_at');
    })
  }

  down() {
    this.table('matches', (table) => {
      table.dropColumns(['cross_platform', 'length', 'started_at', 'finished_at']);
    })
  }
}

module.exports = MatchSchema
