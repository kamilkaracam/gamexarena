'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatchScoreSchema extends Schema {
  up() {
    this.table('match_scores', (table) => {
      table.boolean('is_approved').defaultTo(null).after('away');
    })
  }

  down() {
    this.table('match_scores', (table) => {
      table.dropColumns(['is_approved']);
    })
  }
}

module.exports = MatchScoreSchema;
