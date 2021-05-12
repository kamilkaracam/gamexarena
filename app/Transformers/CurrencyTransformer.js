'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * CurrencyTransformer class
 *
 * @class CurrencyTransformer
 * @constructor
 */
class CurrencyTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (currency) {
    return {
      name: currency.name,
      symbol: currency.symbol,
      code: currency.code,
    }
  }
}

module.exports = CurrencyTransformer
