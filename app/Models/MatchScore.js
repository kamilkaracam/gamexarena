'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MatchScore extends Model {
  user() {
    return this.belongsTo('App/Models/User')
      .pivotModel('App/Models/MatchUser')
      .withPivot(['id', 'match_user_role_id', 'is_approved'])
  }

}

module.exports = MatchScore
