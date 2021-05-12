'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract');
const TransactionTypeTransformer = use('App/Transformers/TransactionTypeTransformer');
const TransactionDescriptionTransformer = use('App/Transformers/TransactionDescriptionTransformer');

/**
 * TransactionTransformer class
 *
 * @class TransactionTransformer
 * @constructor
 */
class TransactionTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'type',
      'description',
    ];
  }

  defaultInclude() {
    return [
      'type',
      'description',
    ]
  }

  /**
   * This method is used to transform the data.
   */
  transform(transaction) {
    return {
      balance: transaction.balance,
      bonus_balance: transaction.bonus_balance,
      amount: transaction.amount,
      is_success: Boolean(transaction.is_success),
      created_at: transaction.created_at,
    };
  }

  includeType(transaction) {
    return this.item(transaction.getRelated('type'), TransactionTypeTransformer);
  }

  includeDescription(transaction) {
    return this.item(transaction.getRelated('description'), TransactionDescriptionTransformer);
  }
}

module.exports = TransactionTransformer;
