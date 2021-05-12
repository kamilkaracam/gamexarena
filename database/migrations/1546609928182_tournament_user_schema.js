'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TournamentUserSchema extends Schema {
  up() {
    this.create('tournament_user', (table) => {
      table.integer('tournament_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.timestamps()

      table.foreign('tournament_id').references('tournaments.id')
      table.foreign('user_id').references('users.id')

      table.primary(['tournament_id', 'user_id'])
    })
  }

  down() {
    this.drop('tournament_user')
  }
}

module.exports = TournamentUserSchema
