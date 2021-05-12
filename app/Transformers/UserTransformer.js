'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const PlatformUsernameTransformer = use('App/Transformers/PlatformUsernameTransformer')
const PlatformGameTransformer = use('App/Transformers/PlatformGameTransformer')
const MatchTransformer = use('App/Transformers/MatchTransformer')
const UserIdentityTransformer = use('App/Transformers/UserIdentityTransformer')
const TransactionTransformer = use('App/Transformers/TransactionTransformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'usernames',
      'platformGames',
      'matches',
      'transactions',
      'account',
      'identity',
    ];
  }

  defaultInclude() {
    return [
      'account',
      'identity',
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform (user) {
    return {
      uuid: user.uuid,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar : user.avatar,
      is_banned: user.is_banned,
      is_penalty: user.is_penalty,
      created_at: user.created_at
    }
  }

  includeUsernames(user) {
    return this.collection(user.getRelated('usernames'), PlatformUsernameTransformer)
  }

  includePlatformGames(user) {
    return this.collection(user.getRelated('platformGames'), PlatformGameTransformer)
  }

  includeMatches(user) {
    return this.collection(user.getRelated('matches'), MatchTransformer)
  }
  includeTransactions(user) {
    return this.collection(user.getRelated('transactions'),TransactionTransformer)
    //return this.transactions().where('is_approved', true).first()
  }
  includeIdentity(user) {
    return this.item(user.getRelated('identity'),UserIdentityTransformer)
    //return this.transactions().where('is_approved', true).first()
  }
  async includeAccount(user) {
    let account = await user.balance() || {
      balance: 0,
      bonus_balance: 0
    }

    return this.item(account, transaction => ({
      balance: transaction.balance,
      bonus_balance: transaction.bonus_balance,
    }))
  }

}

module.exports = UserTransformer
