'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', 'UserHook.generateUuid')
    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  timezone() {
    return this.belongsTo('App/Models/Timezone')
  }

  country() {
    return this.belongsTo('App/Models/Country')
  }

  usernames() {
    return this.belongsToMany('App/Models/Platform')
      .pivotTable('platform_usernames')
      .withPivot(['username'])
  }

  platformGames() {
    return this.belongsToMany('App/Models/PlatformGame')
      .pivotTable('user_platform_game')
  }

  matches() {
    return this.belongsToMany('App/Models/Match')
      .pivotModel('App/Models/MatchUser')
      .withPivot(['is_approved', 'match_user_role_id'])
      .whereInPivot('match_user_role_id', [2, 3])
      .whereNotNull('finished_at')
      .orderBy('created_at', 'desc')
  }

  tournaments() {
    return this.belongsToMany('App/Models/Tournament')
      .pivotTable('tournament_user')
  }

  payments() {
    return this.hasMany('App/Models/Payment')
  }

  transactions() {
    return this.hasMany('App/Models/Transaction').orderBy('created_at', 'desc')
  }

  balance() {
    return this.transactions().where('is_approved', true).first()
  }

  identity(){
    return this.hasOne('App/Models/UserIdentity')
  }

  notifications() {
    return this.hasMany('App/Models/Notification')
      .orderBy('created_at', 'desc')
  }
  withdraw(){
    return this.hasMany('App/Models/Withdraw')
  }
}

module.exports = User
