'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchScoreSchema extends Schema {
  up() {
    this.create('match_scores', (table) => {
      table.increments()
      table.integer('match_id').unsigned().notNullable()
      table.integer('match_user_id').unsigned().notNullable()
      table.integer('home').unsigned().notNullable()
      table.integer('away').unsigned().notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('match_scores')
  }
}

module.exports = MatchScoreSchema
