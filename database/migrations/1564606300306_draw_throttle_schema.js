'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DrawThrottleSchema extends Schema {
  up () {
    this.create('draw_throttles', (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('match_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('draw_throttles')
  }
}

module.exports = DrawThrottleSchema
