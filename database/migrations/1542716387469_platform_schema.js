'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlatformSchema extends Schema {
  up () {
    this.create('platforms', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('slug', 50).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('platforms')
  }
}

module.exports = PlatformSchema
