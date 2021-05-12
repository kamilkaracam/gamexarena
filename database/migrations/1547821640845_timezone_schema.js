'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimezoneSchema extends Schema {
  up() {
    this.create('timezones', (table) => {
      table.increments()
      table.string('country_code', 2).notNullable()
      table.string('zone', 50).notNullable()
      table.timestamps()

      table.foreign('country_code').references('countries.code')
    })
  }

  down() {
    this.drop('timezones')
  }
}

module.exports = TimezoneSchema
