'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagesSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.increments()
      table.timestamps()
    })

    this.create('page_translations', (table) => {
      table.increments()
      table.integer('page_id').unsigned().notNullable()
      table.string('lang',2).notNullable()
      table.string('title',255).notNullable()
      table.string('slug',255).notNullable().unique()
      table.text('content').notNullable()
      table.timestamps()
      table.foreign('page_id').references('pages.id')
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PagesSchema
