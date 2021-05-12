'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaqSSchema extends Schema {
  up () {
    this.create('faqs', (table) => {
      table.increments()
      table.uuid('uuid').notNullable().unique()
      table.timestamps()
    })

    this.create('faq_translations', (table) => {
      table.increments()
      table.integer('faq_id').unsigned().notNullable()
      table.string('lang',2).notNullable()
      table.string('question',255).notNullable()
      table.text('answer').notNullable()
      table.timestamps()
      table.foreign('faq_id').references('faqs.id')
    })
  }

  down () {
    this.drop('faqs')
    this.drop('faq_translations')
  }
}

module.exports = FaqSSchema

