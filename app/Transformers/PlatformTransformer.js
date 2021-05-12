'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const GameTransformer = use('App/Transformers/GameTransformer')

/**
 * PlatformTransformer class
 *
 * @class PlatformTransformer
 * @constructor
 */
class PlatformTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'games',
    ]
  }

  /**
   * This method is used to transform the data.
   */
  transform(platform) {
    return {
      id: platform.id,
      name: platform.name,
      slug: platform.slug,
    }
  }

  includeGames(platform) {
    return this.collection(platform.getRelated('games'), GameTransformer)
  }
}

module.exports = PlatformTransformer
