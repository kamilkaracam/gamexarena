'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const PlatformTransformer = use('App/Transformers/PlatformTransformer')

/**
 * PlatformUsernameTransformer class
 *
 * @class PlatformUsernameTransformer
 * @constructor
 */
class PlatformUsernameTransformer extends TransformerAbstract {
  defaultInclude() {
    return ['platform'];
  }

  /**
   * This method is used to transform the data.
   */
  async transform(platformUsername) {
    return {
      username: platformUsername.$relations.pivot.username,
    }
  }

  includePlatform(platformUsername) {
    return this.item(platformUsername, PlatformTransformer)
  }
}

module.exports = PlatformUsernameTransformer
