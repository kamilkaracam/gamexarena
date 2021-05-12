'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
  static boot() {
    super.boot()

    this.addTrait('UuidGenerator')
  }

  type() {
    return this.belongsTo('App/Models/TransactionType')
  }

  description() {
    return this.belongsTo('App/Models/TransactionDescription')
  }

  currency() {
    return this.belongsTo('App/Models/Currency')
  }

  payment() {
    return this.belongsTo('App/Models/Payment')
  }

  static get primaryKey() {
    return 'uuid'
  }

  static get incrementing() {
    return false
  }
}

module.exports = Transaction
