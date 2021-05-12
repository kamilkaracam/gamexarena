'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const PlatformTransformer = use('App/Transformers/PlatformTransformer')

/**
 * UserIdentityTransformer class
 *
 * @class UserIdentityTransformer
 * @constructor
 */
class UserIdentityTransformer extends TransformerAbstract {
  

  /**
   * This method is used to transform the data.
   */
  async transform(useridentity) {
    return {
      identity_front: useridentity.identity_front,
      identity_back: useridentity.identity_back,
      identity_selfie: useridentity.identity_selfie,
      is_approved: useridentity.is_approved
    }
  }

}

module.exports = UserIdentityTransformer
