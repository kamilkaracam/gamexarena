'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const FaqTranslationTransformer = use('App/Transformers/FaqTranslationTransformer')

/**
 * FaqTransformer class
 *
 * @class FaqTransformer
 * @constructor
 */
class FaqTransformer extends TransformerAbstract {
  
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
  transform(faq) {
    return {
      id: faq.id,
      created_at: faq.created_at,
    }
  }

  includeTranslations(faq) {
    return this.collection(faq.getRelated('translations'), FaqTranslationTransformer)
  }

}

module.exports = FaqTransformer
