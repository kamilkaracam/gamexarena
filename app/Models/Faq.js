'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Faq extends Model {

    translations() {
        return this.hasMany('App/Models/FaqTranslation')
    }
    
  
}

module.exports = Faq
