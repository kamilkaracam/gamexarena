'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.string('state', 150).after('birth_date')
      table.string('city', 150).after('state')
      table.integer('country_id').unsigned().after('city')
      table.integer('timezone_id').unsigned().after('country_id')
      table.enum('gender', ['male', 'female']).after('timezone_id')

      table.foreign('country_id').references('countries.id')
      table.foreign('timezone_id').references('timezones.id')
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumns(['state', 'city', 'country_id', 'timezone_id', 'gender'])
    })
  }
}

module.exports = UserSchema
