'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatchDisputesSchema extends Schema {
  up() {
    this.create('match_disputes', (table) => {
      table.increments();
      table.integer('match_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.string('screenshot');
      table.text('description').notNullable();
      table.timestamps();
      table.timestamp('deleted_at').nullable();

      table.foreign('match_id').references('matches.id');
      table.foreign('user_id').references('users.id');
    })
  }

  down() {
    this.drop('match_disputes')
  }
}

module.exports = MatchDisputesSchema;
