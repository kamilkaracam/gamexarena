'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('tournament', 50).after('birth_date')
      table.string('avatar', 128).after('birth_date')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('tournament')
      table.dropColumn('avatar')
    })
  }
}

module.exports = UserSchema
