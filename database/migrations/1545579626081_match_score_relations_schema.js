'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchScoreRelationsSchema extends Schema {
  up() {
    this.table('match_scores', (table) => {
      table.foreign('match_id').references('matches.id')
      table.foreign('match_user_id').references('match_user.id')
    })
  }

  down() {
    this.table('match_scores', (table) => {
      table.dropForeign('match_id')
      table.dropForeign('match_user_id')
    })
  }
}

module.exports = MatchScoreRelationsSchema
