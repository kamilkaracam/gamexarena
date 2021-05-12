'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BannersSchema extends Schema {
  up () {
    this.table('banners', (table) => {
      table.string('banner_mobile_image').after('banner_image');
    })
  }

  down () {
    this.table('banners', (table) => {
      // reverse alternations
    })
  }
}

module.exports = BannersSchema
