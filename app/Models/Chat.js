'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Chat extends Model {
  static boot() {
    super.boot()

    this.addTrait('UuidGenerator');
    this.addTrait('SoftDelete');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Chat;
