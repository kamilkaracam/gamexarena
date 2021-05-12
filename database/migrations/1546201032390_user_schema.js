'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.string('forgot_key', 100).after('tournament').unique(),
      table.string('avatar',128).after('birth_date')
    })
  }

  down() {
    this.table('users', (table) => {
      table.dropColumn('forgot_key')
      table.dropColumn('avatar')
    })
  }
}

module.exports = UserSchema
