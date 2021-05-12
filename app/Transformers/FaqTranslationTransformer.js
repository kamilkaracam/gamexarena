'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')


/**
 * FaqTransformer class
 *
 * @class FaqTransformer
 * @constructor
 */
class FaqTranslationTransformer extends TransformerAbstract {
  
  /**
   * This method is used to transform the data.
   */
  transform(translation) {
    return {  
      id: translation.id,
      lang: translation.lang,
      question: translation.question,
      answer: translation.answer,
      created_at: translation.created_at
    }
  }


}

module.exports = FaqTranslationTransformer
