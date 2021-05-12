'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.uuid('uuid').notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('username', 25).notNullable().unique()
      table.string('first_name', 30).notNullable()
      table.string('last_name', 30).notNullable()
      table.datetime('birth_date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
