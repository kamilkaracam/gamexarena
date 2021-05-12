'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * GameRuleOptionTransformer class
 *
 * @class GameRuleOptionTransformer
 * @constructor
 */
class GameRuleOptionTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'rule',
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(option) {
    return {
      id: option.id,
      text: option.text,
      value: option.value,
      selected: Boolean(option.selected)
    }
  }

  includeRule(option) {
    // GameRuleTransformer ile hata aldığım için bu şekilde bıraktım
    return this.item(option.getRelated('rule'), rule => ({
      name: rule.name,
      type: rule.type,
    }))
  }
}

module.exports = GameRuleOptionTransformer
