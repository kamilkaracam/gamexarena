'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlatformGame extends Model {
  static get table() {
    return 'platform_game'
  }

  platform() {
    return this.belongsTo('App/Models/Platform')
  }

  game() {
    return this.belongsTo('App/Models/Game')
  }
}

module.exports = PlatformGame
