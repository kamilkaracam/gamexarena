'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TournamentPrizeSchema extends Schema {
  up() {
    this.table('tournament_prizes', (table) => {
      table.boolean('is_bonus').notNullable().default(false).after('is_range');
    })
  }

  down() {
    this.table('tournament_prizes', (table) => {
      table.dropColumns(['is_bonus']);
    })
  }
}

module.exports = TournamentPrizeSchema;
