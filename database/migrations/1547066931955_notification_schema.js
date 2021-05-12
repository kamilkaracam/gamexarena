'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up() {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.text('message').notNullable()
      table.string('href')
      table.boolean('is_read').defaultTo(false).notNullable()
      table.timestamps()

      table.foreign('user_id').references('users.id')
    })
  }

  down() {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
