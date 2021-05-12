'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PageTranslation extends Model {
    
    

    faq() {
        return this.belongsTo('App/Models/Page')
    }
    
  
}

module.exports = PageTranslation
