'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TournamentGameRuleOptionSchema extends Schema {
  up() {
    this.create('tournament_game_rule_option', (table) => {
      table.increments()
      table.integer('tournament_id').unsigned().notNullable()
      table.integer('game_rule_option_id').unsigned().notNullable()

      table.foreign('tournament_id').references('tournaments.id')
      table.foreign('game_rule_option_id').references('game_rule_options.id')
    })
  }

  down() {
    this.drop('tournament_game_rule_option')
  }
}

module.exports = TournamentGameRuleOptionSchema
