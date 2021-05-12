'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tournament extends Model {
  static boot() {
    super.boot()

    this.addTrait('UuidGenerator')
  }

  currency() {
    return this.belongsTo('App/Models/Currency');
  }

  platform() {
    return this.belongsTo('App/Models/Platform')
  }

  game() {
    return this.belongsTo('App/Models/Game')
  }

  gameType() {
    return this.belongsTo('App/Models/GameType')
  }

  options() {
    return this.belongsToMany('App/Models/GameRuleOption')
      .pivotTable('tournament_game_rule_option')
  }

  prizes() {
    return this.hasMany('App/Models/TournamentPrize')
  }

  matches() {
    return this.hasMany('App/Models/Match')
      .orderBy('round_number')
      .orderBy('sort_number');
  }

  competitors() {
    return this.belongsToMany('App/Models/User')
      .pivotModel('App/Models/TournamentUser')
      .withPivot(['rank'])
      .orderBy('rank');
  }

  tournamentrules() {
    return this.hasMany('App/Models/TournamentRuleTranslation')
  }

  static scopeMatchesForRound(query, round) {
    return query.matches().where('round_number', round)
  }
}

module.exports = Tournament;
