'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatSchema extends Schema {
  up() {
    this.create('chats', (table) => {
      table.uuid('uuid').notNullable().primary();
      table.integer('user_id').unsigned().notNullable();
      table.enum('relation_type', ['matches', 'tournaments', 'games']).notNullable();
      table.uuid('relation_id').notNullable();
      table.string('message').notNullable();
      table.timestamps();
      table.timestamp('deleted_at').nullable();
    })
  }

  down() {
    this.drop('chats')
  }
}

module.exports = ChatSchema;
