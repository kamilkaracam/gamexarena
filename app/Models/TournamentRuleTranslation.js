'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TournamentRuleTranslation extends Model {
  
    tournament() {
    return this.belongsTo('App/Models/Tournament')
  }


}

module.exports = TournamentRuleTranslation
