'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * MatchScoreTransformer class
 *
 * @class MatchScoreTransformer
 * @constructor
 */
class MatchScoreTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform(score) {
    return {
      home: score.home,
      away: score.away,
      is_approved: Boolean(score.is_approved),
    }
  }
}

module.exports = MatchScoreTransformer;
