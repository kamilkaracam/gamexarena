'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GameType extends Model {
  rules() {
    return this.hasMany('App/Models/GameRule')
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  static get fortnite() {
    return 'Fortnite Default'
  }

  static get madden19() {
    return 'Madden NFL 19 Default'
  }

  static get nba18() {
    return 'NBA 2K18 Default'
  }

  static get pubg() {
    return 'PUBG Default'
  }

  static get fifa19() {
    return 'FIFA 19 Default'
  }

  static get codBlackout() {
    return 'Blackout'
  }

  static get codCompetitive() {
    return 'Competitive'
  }

  static get codZombies() {
    return 'Zombies'
  }

  static get codMostKills() {
    return 'Most Kills'
  }
}

module.exports = GameType
