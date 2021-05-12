'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Withdraw extends Model {

    user(){
        return this.belongsTo('App/Models/User')
    }

    currency(){
        return this.belongsTo('App/Models/Currency')
    }
  
}

module.exports = Withdraw