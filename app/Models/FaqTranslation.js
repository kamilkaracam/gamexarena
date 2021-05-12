'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FaqTranslation extends Model {
    
    

    faq() {
        return this.belongsTo('App/Models/Faq')
    }
    
  
}

module.exports = FaqTranslation
