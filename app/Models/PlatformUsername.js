'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlatformUsername extends Model {
  platform() {
    return this.belongsTo('App/Models/Platform')
  }
}

module.exports = PlatformUsername
