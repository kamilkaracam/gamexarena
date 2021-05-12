'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract');

/**
 * TournamentPrizeTransformer class
 *
 * @class TournamentPrizeTransformer
 * @constructor
 */
class TournamentPrizeTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform(prize) {
    return {
      prize: prize.prize,
      start: prize.start,
      end: prize.end,
      is_range: Boolean(prize.is_range),
      is_bonus: Boolean(prize.is_bonus),
    }
  }
}

module.exports = TournamentPrizeTransformer;
