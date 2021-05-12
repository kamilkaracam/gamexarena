'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const CurrencyTransformer = use('App/Transformers/CurrencyTransformer')
const UserTransformer = use('App/Transformers/UserTransformer')

/**
 * SettingTransformer class
 *
 * @class SettingTransformer
 * @constructor
 */
class WithdrawTransformer extends TransformerAbstract {

    availableInclude() {
        return [
          'currency',
          'user',
        ]
      }
    
      defaultInclude() {
        return [
          'currency',
          'user',
        ];
      }
  
/**
   * This method is used to transform the data.
   */
  transform(withdraw) {
    return {
      id: withdraw.id,
      user_id: withdraw.user_id,
      amount: withdraw.amount,
      is_approved: withdraw.is_approved,
      created_at: withdraw.created_at,
    }
  }

  includeCurrency(withdraw) {
    return this.item(withdraw.getRelated('currency'), CurrencyTransformer)
  }

  includeUser(withdraw){
    return this.item(withdraw.getRelated('user'),UserTransformer);
  }

  

}

module.exports = WithdrawTransformer
