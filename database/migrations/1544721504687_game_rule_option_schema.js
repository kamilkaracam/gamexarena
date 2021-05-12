'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameRuleOptionSchema extends Schema {
  up() {
    this.create('game_rule_options', (table) => {
      table.increments()
      table.integer('game_rule_id').unsigned().notNullable()
      table.string('text', 50).notNullable()
      table.string('value', 50).notNullable()
      table.string('description', 250)
      table.boolean('selected').defaultTo(false).notNullable()

      table.foreign('game_rule_id').references('game_rules.id')
    })
  }

  down() {
    this.drop('game_rule_options')
  }
}

module.exports = GameRuleOptionSchema
