'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannersSchema extends Schema {
  up () {
    this.create('banners', (table) => {
      table.increments()
      table.string('title');
      table.string('description');
      table.string('banner_image').notNullable();
      table.string('target_url');
      table.boolean('is_active').defaultTo(true).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('banners')
  }
}

module.exports = BannersSchema
