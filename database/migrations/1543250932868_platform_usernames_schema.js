'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlatformUsernamesSchema extends Schema {
  up() {
    this.create('platform_usernames', (table) => {
      table.integer('user_id').unsigned().notNullable()
      table.integer('platform_id').unsigned().notNullable()
      table.string('username').notNullable()

      table.foreign('user_id').references('users.id')
      table.foreign('platform_id').references('platforms.id')

      table.unique(['platform_id', 'username'])
    })
  }

  down() {
    this.drop('platform_usernames')
  }
}

module.exports = PlatformUsernamesSchema
