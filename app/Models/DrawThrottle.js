'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DrawThrottle extends Model {

  user(){
    return this.belongsTo('App/Models/User')
  }
  match(){
    return this.belongsTo('App/Models/Match')
  }

}

module.exports = DrawThrottle
