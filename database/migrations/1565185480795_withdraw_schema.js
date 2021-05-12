'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawSchema extends Schema {
  up () {
    this.create('withdraws', (table) => {
      table.increments();
      table.integer('user_id').unsigned().notNullable();
      table.float('amount').unsigned().notNullable();
      table.boolean('is_approved').defaultTo(true).notNullable();
      table.integer('transaction_id').unsigned().notNullable();
      table.timestamps();

      table.foreign('user_id').references('users.id');
    })
  }

  down () {
    this.drop('withdraws')
  }
}

module.exports = WithdrawSchema
