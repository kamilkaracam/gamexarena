'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MatchUser extends Model {
  static get table() {
    return 'match_user'
  }

  match() {
    return this.belongsTo('App/Models/Match')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  role() {
    return this.belongsTo('App/Models/MatchUserRole')
  }
}

module.exports = MatchUser
