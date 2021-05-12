'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract');

/**
 * TournamentRuleTranslationTransformer class
 *
 * @class TournamentRuleTranslationTransformer
 * @constructor
 */
class TournamentRuleTranslationTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform(rule) {
    return {
      lang: rule.lang,
      rule: rule.rule,
    }
  }
}

module.exports = TournamentRuleTranslationTransformer;
