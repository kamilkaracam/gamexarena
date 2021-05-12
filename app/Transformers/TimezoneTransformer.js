'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * TimezoneTransformer class
 *
 * @class TimezoneTransformer
 * @constructor
 */
class TimezoneTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform(timezone) {
    return {
      id: timezone.id,
      country_code: timezone.country_code,
      zone: timezone.zone,
    }
  }
}

module.exports = TimezoneTransformer
