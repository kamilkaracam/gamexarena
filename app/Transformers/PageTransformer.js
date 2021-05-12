'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const PageTranslationTransformer = use('App/Transformers/PageTranslationTransformer')

/**
 * FaqTransformer class
 *
 * @class FaqTransformer
 * @constructor
 */
class PageTransformer extends TransformerAbstract {
  
  availableInclude() {
    return [
      'translations'
    ];
  }
  defaultInclude() {
    return [
      'translations',
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(page) {
    return {
      id: page.id,
      created_at: page.created_at,
    }
  }

  includeTranslations(page) {
    return this.collection(page.getRelated('translations'), PageTranslationTransformer)
  }

}

module.exports = PageTransformer
