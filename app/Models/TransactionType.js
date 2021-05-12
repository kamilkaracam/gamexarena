'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TransactionType extends Model {
  static boot() {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {slug: 'name'},
      strategy: 'dbIncrement'
    })
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = TransactionType
