'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TournamentSchema extends Schema {
  up() {
    this.create('tournaments', (table) => {
      table.increments()
      table.uuid('uuid').unique()
      table.string('title', 75).notNullable()
      table.string('cover')
      table.integer('platform_id').unsigned().notNullable()
      table.integer('game_id').unsigned().notNullable()
      table.integer('game_type_id').unsigned().notNullable()
      table.float('entry_fee').notNullable()
      table.float('total_prize').notNullable()
      table.integer('currency_id').unsigned().notNullable()
      table.text('additional_info')
      table.boolean('is_active').defaultTo(false)
      table.datetime('started_at').notNullable()
      table.datetime('last_registration_at').notNullable()
      table.datetime('finished_at')
      table.timestamps()

      table.foreign('platform_id').references('platforms.id')
      table.foreign('game_id').references('games.id')
      table.foreign('game_type_id').references('game_types.id')
      table.foreign('currency_id').references('currencies.id')
    })
  }

  down() {
    this.drop('tournaments')
  }
}

module.exports = TournamentSchema
