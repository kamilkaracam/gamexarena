'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * SettingTransformer class
 *
 * @class SettingTransformer
 * @constructor
 */
class BannerTransformer extends TransformerAbstract {
  
/**
   * This method is used to transform the data.
   */
  transform(banner) {
    return {
      id: banner.id,
      title: banner.title,
      description: banner.description,
      banner_image: banner.banner_image,
      banner_mobile_image: banner.banner_mobile_image,
      target_url: banner.target_url,
      is_active: banner.is_active,
      created_at: banner.created_at,
    }
  }


}

module.exports = BannerTransformer
