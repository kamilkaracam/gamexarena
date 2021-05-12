'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Match extends Model {
  static boot() {
    super.boot()

    this.addTrait('UuidGenerator');
    this.addTrait('SoftDelete');
  }

  currency() {
    return this.belongsTo('App/Models/Currency')
  }

  platform() {
    return this.belongsTo('App/Models/Platform')
  }

  game() {
    return this.belongsTo('App/Models/Game')
  }

  type() {
    return this.belongsTo('App/Models/GameType')
  }

  options() {
    return this.belongsToMany('App/Models/GameRuleOption')
      .pivotTable('match_game_rule_option')
  }

  /**
   * All users (creator, home, away)
   * @returns {*}
   */
  users() {
    return this.belongsToMany('App/Models/User')
      .pivotModel('App/Models/MatchUser')
      .withPivot(['id', 'match_user_role_id', 'is_approved'])
  }

  /**
   * All competitors (home, away)
   * @returns {*}
   */
  competitors() {
    return this.users().where(function () {
      this.where('match_user_role_id', 2)
        .orWhere('match_user_role_id', 3);
    })
  }

  /**
   * Home user
   * @returns {Model|*}
   */
  home() {
    return this.users().wherePivot('match_user_role_id', 2)
  }

  /**
   * Away user
   * @returns {Model|*}
   */
  away() {
    return this.users().wherePivot('match_user_role_id', 3)
  }

  scores() {
    return this.hasMany('App/Models/MatchScore')
  }

  disputes() {
    return this.hasMany('App/Models/MatchDispute')
  }

  tournament() {
    return this.belongsTo('App/Models/Tournament')
  }

  static scopeOpen(query) {
    return query.whereNull('finished_at');
  }

  /*static scopeRoundMatches(query, roundNumber) {
    return query.where('round_number', roundNumber);
  }

  static scopeWaitingMatch(query, roundNumber, sortNumber) {
    return query.where('round_number', roundNumber)
      .where('sort_number', (sortNumber % 2 ? sortNumber + 1 : sortNumber - 1))
  }*/
}

module.exports = Match;
