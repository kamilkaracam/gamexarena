'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.string('postal_code', 8).after('state')
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumn('postal_code')
    })
  }
}

module.exports = UserSchema
