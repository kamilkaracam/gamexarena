'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatchSchema extends Schema {
  up() {
    this.table('matches', (table) => {
      table.integer('tournament_id').unsigned().after('uuid');
      table.integer('round_number').unsigned().after('tournament_id');
      table.integer('sort_number').unsigned().after('round_number');

      table.foreign('tournament_id').references('tournaments.id');
    })
  }

  down() {
    this.table('matches', (table) => {
      table.dropForeign('tournament_id');
      table.dropColumns([
        'tournament_id',
        'round_number',
        'sort_number',
      ]);
    })
  }
}

module.exports = MatchSchema;
