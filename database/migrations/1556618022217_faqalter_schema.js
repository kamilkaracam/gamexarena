'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaqalterSchema extends Schema {
  up () {
    this.table('faqs', (table) => {
      table.dropColumn('uuid')
    })
  }

  down () {
    this.table('faqs', (table) => {
      // reverse alternations
    })
  }
}

module.exports = FaqalterSchema
