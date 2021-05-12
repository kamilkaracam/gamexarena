'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlatformsSchema extends Schema {
  up () {
    this.table('platforms', (table) => {
      table.boolean('is_platform').defaultTo(true).after('slug')
      table.boolean('is_social').defaultTo(false).after('is_platform')
    })
  }

  down () {
    this.table('platforms', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PlatformsSchema
