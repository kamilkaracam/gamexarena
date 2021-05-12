'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TournamentPrizeSchema extends Schema {
  up() {
    this.create('tournament_prizes', (table) => {
      table.increments()
      table.integer('tournament_id').unsigned().notNullable()
      table.integer('start').unsigned().notNullable()
      table.integer('end').unsigned()
      table.float('prize').notNullable()
      table.boolean('is_range').defaultTo(false).notNullable()
      table.timestamps()

      table.foreign('tournament_id').references('tournaments.id')
    })
  }

  down() {
    this.drop('tournament_prizes')
  }
}

module.exports = TournamentPrizeSchema
