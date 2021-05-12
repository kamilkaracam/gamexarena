'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TournamentUser extends Model {
  static get table() {
    return 'tournament_user';
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = TournamentUser;
