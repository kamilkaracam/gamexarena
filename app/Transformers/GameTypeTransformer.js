'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const GameRuleTransformer = use('App/Transformers/GameRuleTransformer')

/**
 * GameTypeTransformer class
 *
 * @class GameTypeTransformer
 * @constructor
 */
class GameTypeTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'rules'
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(type) {
    return {
      id: type.id,
      name: type.text,
      description: type.description
    }
  }

  includeRules(type) {
    return this.collection(type.getRelated('rules'), GameRuleTransformer)
  }
}

module.exports = GameTypeTransformer
