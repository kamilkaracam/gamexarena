'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Platform extends Model {
  static scopeIsSocial(query) {
    return query.where('is_social', true)
  }

  games() {
    return this.belongsToMany('App/Models/Game')
      .pivotTable('platform_game')
  }
}

module.exports = Platform
