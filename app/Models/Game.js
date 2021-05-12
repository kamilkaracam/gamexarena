'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  platforms() {
    return this.belongsToMany('App/Models/Platform')
      .pivotTable('platform_game')
  }

  types() {
    return this.hasMany('App/Models/GameType')
  }
}

module.exports = Game
