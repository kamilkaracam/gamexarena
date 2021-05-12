'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserIdentitySchema extends Schema {
  up () {
    this.create('user_identities', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable();
      table.string('identity_front',128).notNullable();
      table.string('identity_back',128).notNullable();
      table.string('identity_selfie',128).notNullable();
      table.boolean('approved');
      table.timestamps()
      table.foreign('user_id').references('users.id');
    })
  }

  down () {
    this.drop('user_identities')
  }
}

module.exports = UserIdentitySchema
