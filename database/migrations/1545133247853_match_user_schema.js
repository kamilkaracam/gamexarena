'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchUserSchema extends Schema {
  up() {
    this.create('match_user_roles', (table) => {
      table.increments()
      table.string('name', 30)
      table.string('slug', 30)
    })

    this.create('match_user', (table) => {
      table.increments()
      table.integer('match_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.integer('match_user_role_id').unsigned().notNullable()
      table.boolean('is_approved').defaultTo(false).notNullable()
      table.timestamps()

      table.unique(['match_id', 'user_id', 'match_user_role_id'])

      table.foreign('match_id').references('matches.id')
      table.foreign('user_id').references('users.id')
      table.foreign('match_user_role_id').references('match_user_roles.id')
    })
  }

  down() {
    this.drop('match_user_roles')
    this.drop('match_user')
  }
}

module.exports = MatchUserSchema
