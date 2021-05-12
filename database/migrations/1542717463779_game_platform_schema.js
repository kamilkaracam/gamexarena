'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GamePlatformSchema extends Schema {
  up () {
    this.create('game_platform', (table) => {
      table.increments()
      table.integer('game_id').unsigned().notNullable()
      table.integer('platform_id').unsigned().notNullable()

      table.foreign('game_id').references('games.id')
      table.foreign('platform_id').references('platforms.id')
    })
  }

  down () {
    this.drop('game_platform')
  }
}

module.exports = GamePlatformSchema
