'use strict'

const Model = use('Model');

class MatchDispute extends Model {
  static boot() {
    super.boot()

    this.addTrait('SoftDelete');
  }

  match() {
    return this.belongsTo('App/Models/Match');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = MatchDispute;
