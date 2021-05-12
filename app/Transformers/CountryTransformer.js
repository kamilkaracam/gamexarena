'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * CountryTransformer class
 *
 * @class CountryTransformer
 * @constructor
 */
class CountryTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform(country) {
    return {
      id: country.id,
      name: country.name,
    }
  }
}

module.exports = CountryTransformer
