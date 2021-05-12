'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameTypeSchema extends Schema {
  up() {
    this.create('game_types', (table) => {
      table.increments()
      table.integer('game_id').unsigned().notNullable()
      table.string('text', 50).notNullable()
      table.text('description')

      table.foreign('game_id').references('games.id')
    })
  }

  down() {
    this.drop('game_types')
  }
}

module.exports = GameTypeSchema
