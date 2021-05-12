'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TournamentSchema extends Schema {
  up() {
    this.table('tournaments', (table) => {
      table.integer('round_expiring_time').notNullable().after('is_active');
    })
  }

  down() {
    this.table('tournaments', (table) => {
      table.dropColumns(['round_expiring_time']);
    })
  }
}

module.exports = TournamentSchema;
