'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchStatusTransactionSchema extends Schema {
  up () {
    this.create('match_status_transactions', (table) => {
      table.increments();
      table.integer('match_id').unsigned().notNullable();
      table.integer('match_status_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.timestamps();

      table.foreign('match_id').references('matches.id');
      table.foreign('match_status_id').references('match_statuses.id');
      table.foreign('user_id').references('users.id');
    })
  }

  down () {
    this.drop('match_status_transactions')
  }
}

module.exports = MatchStatusTransactionSchema
