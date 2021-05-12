'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameRuleSchema extends Schema {
  up() {
    this.create('game_rules', (table) => {
      table.increments()
      table.integer('game_type_id').unsigned().notNullable()
      table.string('name', 150)
      table.text('description')
      table.enum('type', ['text', 'select', 'radio', 'checkbox'])
      table.json('attributes').notNullable()

      table.foreign('game_type_id').references('game_types.id')
    })
  }

  down() {
    this.drop('game_rules')
  }
}

module.exports = GameRuleSchema
