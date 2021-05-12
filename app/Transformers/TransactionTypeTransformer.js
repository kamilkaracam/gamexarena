'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * TransactionTypeTransformer class
 *
 * @class TransactionTypeTransformer
 * @constructor
 */
class TransactionTypeTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (type) {
    return {
      id: type.id,
      name: type.name,
      slug: type.slug,
    }
  }
}

module.exports = TransactionTypeTransformer
