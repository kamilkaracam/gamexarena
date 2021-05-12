'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const GameTypeTransformer = use('App/Transformers/GameTypeTransformer')

/**
 * GameTransformer class
 *
 * @class GameTransformer
 * @constructor
 */
class GameTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'types',
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(game) {
    return {
      id: game.id,
      name: game.name,
      slug: game.slug,
    }
  }

  includeTypes(game) {
    return this.collection(game.getRelated('types'), GameTypeTransformer)
  }
}

module.exports = GameTransformer
