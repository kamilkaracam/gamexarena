'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * SettingTransformer class
 *
 * @class SettingTransformer
 * @constructor
 */
class SettingTransformer extends TransformerAbstract {
  
/**
   * This method is used to transform the data.
   */
  transform(setting) {
    return {
      id: setting.id,
      group: setting.group,
      key: setting.key,
      value: setting.value,
      created_at: setting.created_at,
    }
  }

  

}

module.exports = SettingTransformer
