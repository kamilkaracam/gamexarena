'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchStatusSchema extends Schema {
  up() {
    this.create('match_statuses', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      table.string('slug', 30).notNullable()
    })
  }

  down() {
    this.drop('match_statuses')
  }
}

module.exports = MatchStatusSchema
