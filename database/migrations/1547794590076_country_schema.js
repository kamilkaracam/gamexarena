'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountrySchema extends Schema {
  up() {
    this.create('countries', (table) => {
      table.increments()
      table.string('code', 2).notNullable().unique()
      table.string('name', 50).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('countries')
  }
}

module.exports = CountrySchema
