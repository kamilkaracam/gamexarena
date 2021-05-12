'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TournamentUserSchema extends Schema {
  up() {
    this.table('tournament_user', (table) => {
      table.integer('rank').unsigned().after('user_id');
    })
  }

  down() {
    this.table('tournament_user', (table) => {
      table.dropColumns(['rank']);
    })
  }
}

module.exports = TournamentUserSchema;
