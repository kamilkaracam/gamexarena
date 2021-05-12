'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchSchema extends Schema {
  up() {
    this.create('matches', (table) => {
      table.increments()
      table.uuid('uuid').unique().notNullable()
      table.integer('platform_id').unsigned().notNullable()
      table.integer('game_id').unsigned().notNullable()
      table.integer('game_type_id').unsigned().notNullable()
      table.integer('status_id').unsigned().notNullable()
      table.float('wager').unsigned().notNullable()
      table.text('custom_rules')
      table.timestamps()

      table.foreign('platform_id').references('platforms.id')
      table.foreign('game_id').references('games.id')
      table.foreign('game_type_id').references('game_types.id')
      table.foreign('status_id').references('match_statuses.id')
    })

    this.create('match_game_rule_option', (table) => {
      table.increments()
      table.integer('match_id').unsigned().notNullable()
      table.integer('game_rule_option_id').unsigned().notNullable()

      table.foreign('match_id').references('matches.id')
      table.foreign('game_rule_option_id').references('game_rule_options.id')
    })
  }

  down() {
    this.drop('match_game_rule_option')
    this.drop('matches')
  }
}

module.exports = MatchSchema
