'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')


/**
 * PageTranslationTransformer class
 *
 * @class PageTranslationTransformer
 * @constructor
 */
class PageTranslationTransformer extends TransformerAbstract {
  
  /**
   * This method is used to transform the data.
   */
  transform(translation) {
    return {  
      id: translation.id,
      lang: translation.lang,
      title: translation.title,
      slug: translation.slug,
      content: translation.content,
      created_at: translation.created_at
    }
  }


}

module.exports = PageTranslationTransformer
