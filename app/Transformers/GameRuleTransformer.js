'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const GameRuleOptionTransformer = use('App/Transformers/GameRuleOptionTransformer')

/**
 * GameRuleTransformer class
 *
 * @class GameRuleTransformer
 * @constructor
 */
class GameRuleTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'options'
    ];
  }

  defaultInclude() {
    return [
      'options'
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(rule) {
    return {
      id: rule.id,
      name: rule.name,
      type: rule.type,
      attributes: JSON.parse(rule.attributes),
    }
  }

  includeOptions(rule) {
    return this.collection(rule.getRelated('options'), GameRuleOptionTransformer)
  }
}

module.exports = GameRuleTransformer
