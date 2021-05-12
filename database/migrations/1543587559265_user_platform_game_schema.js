'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPlatformGameSchema extends Schema {
  up() {
    this.create('user_platform_game', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('platform_game_id').unsigned().notNullable()

      table.foreign('user_id').references('users.id')
      table.foreign('platform_game_id').references('platform_game.id')

      table.unique(['user_id', 'platform_game_id'])
    })
  }

  down() {
    this.drop('user_platform_game')
  }
}

module.exports = UserPlatformGameSchema
