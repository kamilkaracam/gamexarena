'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserPlatformGame extends Model {
  games() {
    return this.manyThrough('App/Models/PlatformGame', 'games')
  }
}

module.exports = UserPlatformGame
