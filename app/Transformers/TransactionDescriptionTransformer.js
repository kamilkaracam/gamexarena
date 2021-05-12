'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * TransactionDescriptionTransformer class
 *
 * @class TransactionDescriptionTransformer
 * @constructor
 */
class TransactionDescriptionTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (description) {
    return {
      id: description.id,
      text: description.text,
    }
  }
}

module.exports = TransactionDescriptionTransformer
