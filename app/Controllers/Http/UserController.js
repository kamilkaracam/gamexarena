'use strict'

const User = use('App/Models/User')
const UserIdentity = use('App/Models/UserIdentity')

const Transaction = use('App/Models/Transaction');
const TransactionTransformer = use('App/Transformers/TransactionTransformer');

const UserTransformer = use('App/Transformers/UserTransformer')
const Database = use('Database');
const Currency = use('App/Models/Currency');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
    async index ({ request, transform }) {
      return transform.paginate(await User.query().paginate(), UserTransformer)
    }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   */
  async show ({ params, transform }) {
    return transform.item(await User.findByOrFail('uuid', params.id), UserTransformer)
  }

  /**
   * Show User By id
   * @param {id} param0 
   */
  async show_by_id({params,response}){
    const user = await User.query().where('id','=',params.id).first()
    return response.status(200).json(user);
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const postParams = request.only(['first_name', 'last_name','uuid','password'])
    const user = await User.query().where('uuid',postParams.uuid).first()
    user.merge(postParams)
    await user.save()
    return response.status(202).json({})
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
   * Ban or UnBan User
   * @param {user_id,banned} param0 
   */
  async banuser ({ params,request,response }) {
    const user = await User.query().where('uuid',params.uuid).first()
    user.is_banned = 1
    user.save()
    return response.status(202).json({}) 
  }
  async unbanuser ({ params,request,response }) {
    const user = await User.query().where('uuid',params.uuid).first()
    user.is_banned = 0
    user.save()
    return response.status(202).json({}) 
  }

  /**
   * Penalty user
   * @param {user_id,penalty} param
   */
  async penaltyuser ({ params, request, response }) {
    const postParams = request.only(['amount', 'description'])
    const user = await User.query().where('uuid',params.uuid).first()

    
    user.is_penalty = user.is_penalty + 1;
    await user.save()

    const balance = (await user.balance()) || {balance: 0, bonus_balance: 0};
    const currency = await Currency.query().where('code', 'EUR').first();
    const trx = await Database.beginTransaction();

    const transaction = await user.transactions().create({
      transaction_type_id: 9,
      transaction_description_id: 15,
      currency_id: currency.id,
      amount: postParams.amount,
      balance: balance.balance - postParams.amount,
      bonus_balance: balance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);
    await trx.commit();


    return response.status(202).json({})
  }

  /**
   * Add Balance
   * @param {user_id,amount} param0 
   */
  async add_balance({params,request,response}){
    
    const postParams = request.only(['amount']);
    
    const user = await User.query().where('uuid',params.uuid).first();

    

    const balance = (await user.balance()) || {balance: 0, bonus_balance: 0};
    const currency = await Currency.query().where('code', 'EUR').first();
    const trx = await Database.beginTransaction();

    const transaction = await user.transactions().create({
      transaction_type_id: 11,
      transaction_description_id: 17,
      currency_id: currency.id,
      amount: postParams.amount,
      balance: balance.balance + parseFloat(postParams.amount),
      bonus_balance: balance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);
    await trx.commit();


    return response.status(202).json({})

  }

  /**
   * Add Bonus Balance
   * @param {uuid,amount} param0 
   */
  async add_bonus_balance({params,request,response}){
    
    const postParams = request.only(['amount']);
    const user = await User.query().where('uuid',params.uuid).first();

    const balance = (await user.balance()) || {balance: 0, bonus_balance: 0};
    const currency = await Currency.query().where('code', 'EUR').first();
    const trx = await Database.beginTransaction();

    const transaction = await user.transactions().create({
      transaction_type_id: 12,
      transaction_description_id: 18,
      currency_id: currency.id,
      amount: postParams.amount,
      balance: balance.balance,
      bonus_balance: balance.bonus_balance + parseFloat(postParams.amount),
      is_success: true,
      is_approved: true,
    }, trx);
    await trx.commit();

    return response.status(202).json({})
  }

  async identity({params, transform, response}){
    let user_identity = await UserIdentity.query().where('user_id',params.id).first()
    return response.json({data:user_identity})
  }

  async leadersTable({request,transform,response}){
    
    return transform.include('matches').paginate(await User.query().paginate(),UserTransformer)
  }

  async transactions({params,request,transform,response}){
    const user = await User.query().where('uuid',params.id).first()
    return transform.paginate(await user.transactions().paginate(), TransactionTransformer);
  }

  async leaders ({request,transform,response}){
    
  }


}

module.exports = UserController
