'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const TimezoneTransformer = use('App/Transformers/TimezoneTransformer')
const CountryTransformer = use('App/Transformers/CountryTransformer')
const PlatformUsernameTransformer = use('App/Transformers/PlatformUsernameTransformer')
const PlatformGameTransformer = use('App/Transformers/PlatformGameTransformer')
const UserIdentityTransformer = use('App/Transformers/UserIdentityTransformer')

/**
 * MeTransformer class
 *
 * @class MeTransformer
 * @constructor
 */
class MeTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'account',
      'usernames',
      'platformGames',
      'identity'
    ]
  }

  defaultInclude() {
    return [
      'account',
      'timezone',
      'country',
      'identity'
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(me) {
    return {
      uuid: me.uuid,
      id: me.id,
      email: me.email,
      username: me.username,
      first_name: me.first_name,
      last_name: me.last_name,
      birth_date: me.birth_date,
      state: me.state,
      postal_code: me.postal_code,
      city: me.city,
      gender: me.gender,
      avatar: me.avatar,
    }
  }

  includeTimezone(me) {
    return this.item(me.getRelated('timezone'), TimezoneTransformer)
  }

  includeCountry(me) {
    return this.item(me.getRelated('country'), CountryTransformer)
  }


  async includeAccount(me) {
    let account = await me.balance() || {
      balance: 0,
      bonus_balance: 0
    }

    return this.item(account, transaction => ({
      balance: transaction.balance,
      bonus_balance: transaction.bonus_balance,
    }))
  }

  includeUsernames(me) {
    return this.collection(me.getRelated('usernames'), PlatformUsernameTransformer)
  }

  includePlatformGames(me) {
    return this.collection(me.getRelated('platformGames'), PlatformGameTransformer)
  }

  includeIdentity(me) {
    return this.item(me.getRelated('identity'), UserIdentityTransformer)
  }
  
}

module.exports = MeTransformer
