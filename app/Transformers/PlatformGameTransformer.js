'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const PlatformTransformer = use('App/Transformers/PlatformTransformer')
const GameTransformer = use('App/Transformers/GameTransformer')

/**
 * PlatformGameTransformer class
 *
 * @class PlatformGameTransformer
 * @constructor
 */
class PlatformGameTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'platform',
      'game',
    ];
  }

  defaultInclude() {
    return [
      'platform',
      'game',
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(platformGame) {
    return {
      id: platformGame.id,
    }
  }

  includePlatform(platformGame) {
    return this.item(platformGame.getRelated('platform'), PlatformTransformer)
  }

  includeGame(platformGame) {
    return this.item(platformGame.getRelated('game'), GameTransformer)
  }
}

module.exports = PlatformGameTransformer
