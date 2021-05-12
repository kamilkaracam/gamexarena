'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserIdentitySchema extends Schema {
  up () {
    this.table('user_identities', (table) => {
      table.boolean('is_approved').defaultTo(false).after('identity_selfie');
    })
  }

  down () {
    this.table('user_identities', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserIdentitySchema
