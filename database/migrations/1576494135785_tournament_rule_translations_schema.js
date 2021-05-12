'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TournamentRuleTranslationsSchema extends Schema {
  up () {
    this.create('tournament_rule_translations', (table) => {
      table.increments()
      table.integer('tournament_id').unsigned().notNullable()
      table.string('lang',2).notNullable()
      table.text('rule').notNullable()
      table.timestamps()
      table.foreign('tournament_id').references('tournaments.id')
    })
  }

  down () {
    this.drop('tournament_rule_translations')
  }
}

module.exports = TournamentRuleTranslationsSchema
