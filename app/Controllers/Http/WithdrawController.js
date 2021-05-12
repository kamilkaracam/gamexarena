'use strict'

const Withdraw = use('App/Models/Withdraw')
const WithdrawTransformer = use('App/Transformers/WithdrawTransformer')
const Database = use('Database');
const User = use('App/Models/User');
const Setting = use('App/Models/Setting');
const Currency = use('App/Models/Currency');

const Transaction = use('App/Models/Transaction')

const paypal = require('paypal-rest-sdk');


/**
 * Resourceful controller for interacting with Faqs
 */
class WithdrawController {
  /**
   * Show a list of all FAQ.
   * GET FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request, transform,response }) {
    return transform.paginate(await Withdraw.query().where('is_approved',0).orderBy('created_at','DESC').paginate(1,1000), WithdrawTransformer )    
  }


  async approved_list ({ request, transform,response }) {
    return transform.paginate(await Withdraw.query().where('is_approved',1).orderBy('created_at','DESC').paginate(1,1000), WithdrawTransformer )    
  }

  async deny_list({ request, transform,response }) {
    return transform.paginate(await Withdraw.query().where('is_approved',2).orderBy('created_at','DESC').paginate(1,1000), WithdrawTransformer )    
  }


  /**
   * Approve
   * @param {object} 
   */
  async approve({auth,request,response}){

    let params = request.post()
    
    const withdraw = await Withdraw.query().where('id',parseInt(params.withdraw_id)).first()

    const withdrawUser = await User.find(withdraw.user_id);

    
    
    if(withdraw.is_approved !== 0){
      return response.status(406).json({})
    }
    if(withdraw){
      withdraw.is_approved = 1
      withdraw.save()
    }

    
    
    /*TO-DO Paypal gonderme + transaction islemi yapilacak, paypal kodlari ekledim */

    //Paypal
    const paypalMode = await Setting.query().where('group','paypal').where('key','mode').first()
    const paypalClientId = await Setting.query().where('group','paypal').where('key','client_id').first()
    const paypalClientSecret = await Setting.query().where('group','paypal').where('key','client_secret').first()
    const paypalEmail = await Setting.query().where('group','paypal').where('key','email').first()
    
    paypal.configure({
      'mode': paypalMode.value, //sandbox or live
      'client_id': paypalClientId.value,
      'client_secret': paypalClientSecret.value
    });


    let sender_batch_id = Math.random().toString(36).substring(9);

    var create_payout_json = {
      "sender_batch_header": {
          "sender_batch_id": sender_batch_id,
          "email_subject": "You have a payment from GamexArena"
      },
      "items": [
          {
              "recipient_type": "EMAIL",
              "amount": {
                  "value": withdraw.amount,
                  "currency": "EUR"
              },
              "receiver": withdrawUser.email,
              "note": "Thank you.",
              "sender_item_id": "item_3"
          }
      ]
    };

    
    
    
   
     //Locale transaction
    const balance = (await withdrawUser.balance()) || {balance: 0, bonus_balance: 0};
    const currency = await Currency.query().where('code', 'EUR').first();
    const trx = await Database.beginTransaction();

    const transaction = await withdrawUser.transactions().create({
      transaction_type_id: 6,
      transaction_description_id: 1,
      currency_id: currency.id,
      amount: withdraw.amount,
      balance: balance.balance - withdraw.amount,
      bonus_balance: balance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);
    await trx.commit();
    
    //Locale Transaction Eof...
    
    const sync_mode = 'false';
    paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
        if (error) {
          console.log(error);
            return 
        } else {
          return response.status(201).json({payout:payout});
        }
    });
    //Paypal Eof..

    

    
  }

  /**
   * Approve
   * @param {object} 
   */
  async deny({request,response}){

    let params = request.post()
    
    const withdraw = await Withdraw.query().where('id',parseInt(params.withdraw_id)).first()

    if(withdraw.is_approved == 1 || withdraw.is_approved == 2){
      return response.status(206).json({message:'Allready approved/denied!'})
    }

    if(withdraw){
      withdraw.is_approved = 2
      await withdraw.save()

      const withdrawUser = await User.find(withdraw.user_id);
      const balance = (await withdrawUser.balance()) || {balance: 0, bonus_balance: 0};
      const currency = await Currency.query().where('code', 'EUR').first();
      const trx = await Database.beginTransaction();

      const transaction = await withdrawUser.transactions().create({
        transaction_type_id: 8,
        transaction_description_id: 1,
        currency_id: currency.id,
        amount: withdraw.amount,
        balance: balance.balance + withdraw.amount,
        bonus_balance: balance.bonus_balance,
        is_success: true,
        is_approved: true,
      }, trx);
      await trx.commit();

      return response.status(202).json({})
    }
    
  }

 

  /**
   * Create/save a new FAQ.
   * POST FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response,transform }) {
    let params = request.post()  

    await auth.getUser()
    
    let withdraw = new Withdraw()
    withdraw.user_id = auth.user.id
    withdraw.amount = params.amount
    withdraw.currency_id = 1
    await withdraw.save()

    /* Transaction Money With Withdraw-Pending... */
    const withdrawUser = await User.find(withdraw.user_id);
    const balance = (await withdrawUser.balance()) || {balance: 0, bonus_balance: 0};
    const currency = await Currency.query().where('code', 'EUR').first();
    const trx = await Database.beginTransaction();

    const transaction = await withdrawUser.transactions().create({
      transaction_type_id: 7,
      transaction_description_id: 1,
      currency_id: currency.id,
      amount: withdraw.amount,
      balance: balance.balance - withdraw.amount,
      bonus_balance: balance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);

    await trx.commit();

      
    return transform.item(withdraw,WithdrawTransformer)
  }

  /**
   * Display a single FAQ.
   * GET fags/:id
   *
   * @param {object} ctx
   */
  async show ({ params, transform }) {
    return transform.item(await Withdraw.findByOrFail('id', params.id), WithdrawTransformer)
  }

  /**
   * Update faq details.
   * PUT or PATCH faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let postParams = request.post();  
    
    let withdraw = await Withdraw.find(params.id)
    withdraw.user_id = auth.user.id
    withdraw.amount = params.amount
    await withdraw.save()

    return transform.item(withdraw, WithdrawTransformer)
  }

  /**
   * Delete a faq with id.
   * DELETE faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = WithdrawController
