'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database')
const Currency = use('App/Models/Currency')
const TransactionType = use('App/Models/TransactionType')
const TransactionDescription = use('App/Models/TransactionDescription')

/**
 * Resourceful controller for interacting with payments
 */
class PaymentController {
  /**
   * Create/save a new payment.
   * POST payments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({auth, request, response}) {
    const params = request.post();
    const currency = await Currency.findByOrFail('code', params.transactions[0].amount.currency);

    const trx = await Database.beginTransaction();

    const payment = await auth.user.payments().create({
      amount: params.transactions[0].amount.total,
      currency_id: currency.id,
      is_approved: params.state === 'approved',
      raw_response: JSON.stringify(params),
    }, trx);

    const actualAccount = await auth.user.balance() || {
      balance: 0,
      bonus_balance: 0
    };

    const descriptionId = Math.floor((Math.random() * 10) + 1);

    const transactionType = await TransactionType.findByOrFail('slug', 'deposit');
    const transactionDescription = await TransactionDescription.find(descriptionId);

    await auth.user.transactions().create({
      transaction_type_id: transactionType.id,
      transaction_description_id: transactionDescription.id,
      currency_id: currency.id,
      payment_id: payment.id,
      amount: payment.amount,
      balance: parseFloat(actualAccount.balance) + parseFloat(payment.amount),
      bonus_balance: actualAccount.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);

    trx.commit();

    return response.status(201)
      .header('new-object', payment.id)
      .json({
        amount: payment.amount,
        currency_code: payment.currency().code
      })
  }
}

module.exports = PaymentController;
