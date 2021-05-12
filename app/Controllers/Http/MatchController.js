'use strict'

const Event = use('Event');
const Database = use('Database');

const Currency = use('App/Models/Currency');
const Match = use('App/Models/Match');
const User = use('App/Models/User');
const MatchDispute = use('App/Models/MatchDispute');
const MatchScore = use('App/Models/MatchScore');
const MatchStatus = use('App/Models/MatchStatus');
const MatchUser = use('App/Models/MatchUser');
const MatchUserRole = use('App/Models/MatchUserRole');
const MatchDisputes = use('App/Models/MatchDispute');
const DrawThrottle = use('App/Models/DrawThrottle')
const MatchTransformer = use('App/Transformers/MatchTransformer');
const MatchDisputeTransformer = use('App/Transformers/MatchDisputeTransformer');

/**
 * Resourceful controller for interacting with matches
 */
class MatchController {
  /**
   * Show a list of all matches.
   * GET matches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({request,auth,response, transform}) {
    let non_matches = await this.restore_non_played_matches({transform});

    return transform.paginate(await Match.query()
                    .whereRaw('created_at BETWEEN DATE_SUB(NOW(),INTERVAL 3 HOUR) AND DATE_SUB(NOW(),INTERVAL 0 MINUTE) AND finished_at IS NULL')
                    //.where('finished_at',NULL)
                    .open()
                    .orderBy('created_at',  'desc')
                    .paginate(), MatchTransformer)
  }

  async restore_non_played_matches({transform}){
    const nonPlayedMatches = await Match.query()
                                  .whereRaw('created_at < DATE_SUB(NOW() , INTERVAL 3 HOUR) \
                                              AND( \
                                                started_at IS NULL && deleted_at IS NULL && finished_at IS NULL \
                                                AND id NOT IN(SELECT match_id FROM match_scores) \
                                                AND wager > 0 \
                                              )')
                                  .fetch();
    const non_matches = JSON.parse(JSON.stringify(nonPlayedMatches));


    for(const i in non_matches){
      if(non_matches[i].id){
        let match = await transform.item(await Match.find(non_matches[i].id), MatchTransformer)
        

        const matchUser = await User.find(match.home.id);

        const balance = (await matchUser.balance()) || {balance: 0, bonus_balance: 0};
        const currency = await Currency.findByOrFail('code', 'EUR');
        const trx = await Database.beginTransaction();


        const transaction = await matchUser.transactions().create({
          transaction_type_id: 13,
          transaction_description_id: 19,
          currency_id: currency.id,
          amount: match.wager,
          balance: balance.balance + match.wager,
          bonus_balance: balance.bonus_balance,
          is_success: true,
          is_approved: true,
        }, trx);
        await trx.commit();
        const matchFinal = await Match.find(non_matches[i].id);
        matchFinal.finished_at = new Date();
        await matchFinal.delete();

        

      }
      
    }
    
  }

  /**
   * Create/save a new match.
   * POST matches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({auth, request, response}) {
    const params = request.all();

    if(params.wager === 0){
      return response.status(402).json({message: 'Your wager must at least 1 Euro or $.'});
    }

    const balance = (await auth.user.balance()) || {balance: 0, bonus_balance: 0};
    if (params.wager > balance.balance) {
      return response.status(402).json({message:'You have not enough balance to create match.'});
    }

    let userGames = await auth.user.platformGames().fetch()
    let userPlatformGameCheck = JSON.parse(JSON.stringify(userGames)).filter(item => item.platform_id === params.platform_id && item.game_id === params.game_id)
    if(userPlatformGameCheck.length === 0){
      return response.status(402).json({message:'Game and platform not in your game settings!'});
    }
    
    const roleCreator = await MatchUserRole.findByOrFail('slug', 'creator');
    const roleHome = await MatchUserRole.findByOrFail('slug', 'home');
    const currency = await Currency.findByOrFail('code', 'EUR');

    const trx = await Database.beginTransaction();

    const match = await Match.create({
      platform_id: params.platform_id,
      game_id: params.game_id,
      game_type_id: params.game_type_id,
      status_id: (await MatchStatus.findByOrFail('slug', 'invited')).id,
      wager: params.wager,
      currency_id: currency.id,
      custom_rules: params.custom_rules,
    }, trx);



    params.options.forEach(async i => {
      await match.options().attach(i)
    });

    const userRoles = [
      {user_id: auth.user.id, role_id: roleCreator.id},
      {user_id: auth.user.id, role_id: roleHome.id}
    ];

    userRoles.forEach(async i => {
      await match.users().attach(i.user_id, async (row) => {
        row.is_approved = true;
        row.match_user_role_id = i.role_id
      })
    });

    const transaction = await auth.user.transactions().create({
      transaction_type_id: 3,
      transaction_description_id: 1,
      currency_id: currency.id,
      amount: params.wager,
      balance: balance.balance - params.wager,
      bonus_balance: balance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);

    await trx.commit();

    Event.fire('created::match', {user: auth.user, match});

    return response.status(201)
      .header('new-object', match.uuid)
      .json({})
  }

  /**
   * Display a single match.
   * GET matches/:id
   */
  async show({params, transform}) {

    await this.finish_unfinished_match(params.id)

    return transform.item(await Match.findByOrFail('uuid', params.id), MatchTransformer)
  }

  /**
   * Update match details.
   * PUT or PATCH matches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a match with id.
   * DELETE matches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params,auth}) {
    const match = await Match.findByOrFail('uuid', params.id);

    await match.delete();

    Event.fire('cancel::match', {match, home: auth.user});

    return {};
  }

  /**
   * Join a match
   * [POST] /v1/matches/{uuid}/join
   *
   * @param params
   * @param auth
   * @param response
   * @returns {Promise<void>}
   */
  async join({auth, params, response}) {
    const match = await Match.findByOrFail('uuid', params.uuid)
    const roleAway = await MatchUserRole.findByOrFail('slug', 'away')
    const currency = await Currency.findByOrFail('code', 'EUR');

    const gameCheck = await auth.user.platformGames().where('platform_game_id',match.game_id).getCount()

    if(gameCheck === 0){
      return response.status(406).json({
        message: 'Bu maç platform oyunlarınız arasında olmadığından katılamazsınız!'
      })
    }


    //return response.status(200).json(userPlatformGames)

    if(await auth.user.usernames().getCount() === 0){
      return response.status(406).json({
        message: 'Add gamer tags to your profile'
      })
    }



    // Maça iki tarafta katılmış mı?
    if (await match.competitors().getCount() === 2) {
      return response.status(406).json({
        message: 'Bu maç doludur',
      })
    }

    // Kullanıcı maça katılmış mı?
    if (await auth.user.matches().where('uuid', match.uuid).getCount()) {
      return response.status(406).json({
        message: 'Bu maça katıldınız',
      })
    }

    const balance = (await auth.user.balance()) || {balance: 0, bonus_balance: 0};

    // Bakiyesi var mı?
    if (match.wager > balance.balance) {
      return response.status(402).json({});
    }



    const trx = await Database.beginTransaction()

    const opponent = await match.users().attach(auth.user.id, async (row) => {
      row.is_approved = false;
      row.match_user_role_id = roleAway.id;
    }, trx);


    

    const transaction = await auth.user.transactions().create({
      transaction_type_id: 3,
      transaction_description_id: 1,
      currency_id: currency.id,
      amount: match.wager,
      balance: parseFloat(balance.balance) - parseFloat(match.wager),
      bonus_balance: balance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);

    await trx.commit();

    // TODO: Karşılaşmanın durumunu değiştir

    //trx.commit()

    Event.fire('join::match', {match})

    return response.status(201).json({})
  }

  /**
   * Leave match
   * [DELETE] /v1/matches/{uuid}/leave
   *
   * @param auth
   * @param params
   * @param response
   * @returns {Promise<*|Promise<any>>}
   */
  async leave({auth, params, response}) {
    const match = await Match.findByOrFail('uuid', params.uuid)
    // Deplasman tarafı maçtan ayrılabilir, ev sahibi iptali kullanmalı
    const ownMatch = await match.users().wherePivot('user_id', auth.user.id)
      .wherePivot('match_user_role_id', (await MatchUserRole.findByOrFail('slug', 'away')).id)
      .first()

    if (!ownMatch) {
      return response.status(403).json({
        message: 'Sadece deplasman tarafı oyundan ayrılabilir'
      })
    }

    await match.users().detach(auth.user.id);

    // TODO: Karşılaşmanın durumunu değiştir

    Event.fire('leave::match', {match, home: await match.home().first(), away: await auth.user});

    return response.json({})
  }

  /**
   * Accept away team
   * [POST] /v1/matches/{uuid}/accept-away
   *
   * @param auth
   * @param params
   * @param response
   * @returns {Promise<*>}
   */
  async acceptAway({auth, params, response}) {
    const match = await Match.findByOrFail('uuid', params.uuid);

    const home = await match.home().first();
    if (home.uuid !== auth.user.uuid) {
      return response.status(403).json({
        message: 'Bu işlemi yalnızca ev sahibi yapabilir',
      });
    }

    await match.users().pivotQuery().where('match_user_role_id', 3).update({is_approved: true});

    Event.fire('accepted-away::match', {match});

    return {}
  }

  /**
   * Reject away
   * [DELETE] /v1/matches/{uuid}/reject-away
   *
   * @param auth
   * @param params
   * @param response
   * @returns {Promise<*>}
   */
  async rejectAway({auth, params, response}) {
    const match = await Match.findByOrFail('uuid', params.uuid);

    const home = await match.home().first();
    if (home.uuid !== auth.user.uuid) {
      return response.status(403).json({
        message: 'Bu işlemi yalnızca ev sahibi yapabilir',
      });
    }

    const away = await match.away().first();

    await match.users().detach(away.id);

    Event.fire('rejected-away::match', {match, away});

    return {};
  }

  /**
   * Start match
   * [PATCH] /v1/matches/{uuid}/start
   *
   * @param auth
   * @param params
   * @param transform
   * @returns {Promise<*>}
   */
  async start({auth, params, transform}) {
    const match = await Match.findByOrFail('uuid', params.uuid);
    match.started_at = new Date();
    await match.save();

    return transform.item(match, MatchTransformer);
  }

  /**
   * Match Distputes
   * 
   */
  async disputes({auth,params,transform,response}){
    const matches = await Match.query()
                          .select(['matches.*'])
                          .join('match_disputes','matches.id','match_id')
                          .orderBy('matches.created_at','DESC').paginate()

   
    return transform.paginate(matches,MatchTransformer);
  }

  async checkdispute({auth,params,transform,response}){
    const disputes = await Match.query()
                          .select(['match_disputes.*'])
                          .join('match_disputes','matches.id','match_id')
                          .where('matches.uuid','=',params.uuid)
                          .orderBy('matches.created_at','DESC').fetch()
    
    if(disputes.length === 2){
      const data = {isdispute: false};
      return response.status(202).json({data:data})
    }else{
      const data = {isdispute: true};
      return response.status(202).json({data:data})
    }
  }


  /**
   * Set Dispute Winner of match
   * [PATCH] /v1/matches/{uuid}/setwinner
   *
   * @param auth
   * @param params
   * @param transform
   * @returns {Promise<*>}
   */
  async setwinner({params, request, transform,response}) {
    const postParams = request.only(['user_id'])
    
    const match = await Match.findByOrFail('uuid', params.uuid);
    
    const winner = await MatchUser.query().where('match_id',match.id).where('user_id',postParams.user_id).orderBy('match_user_role_id','desc').first()
    const loser = await MatchUser.query().where('match_id',match.id).whereNot('user_id','=',postParams.user_id).orderBy('match_user_role_id','desc').first()
    const scores = await MatchScore.query().where('match_id',match.id).where('match_user_id',winner.id).first()
    const winnerUser = await User.query().where('id',winner.user_id).first()
    const loseUser = await User.query().where('id',loser.user_id).first()

    //Winner send money and set score
    
    scores.is_approved = 1
    scores.save()

    const balance = (await winnerUser.balance()) || {balance: 0, bonus_balance: 0};
    const currency = await Currency.query().where('code', 'EUR').first();
    const trx = await Database.beginTransaction();

    let total = parseFloat(match.wager) * 2;
    let amount = parseFloat(total - ((total / 100) * 10));

    const transaction = await winnerUser.transactions().create({
      transaction_type_id: 10,
      transaction_description_id: 1,
      currency_id: currency.id,
      amount: amount,
      balance: balance.balance + amount,
      bonus_balance: balance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);
    
    //kaybedene ceza ver
    loseUser.is_penalty = loseUser.is_penalty + 1;
    await loseUser.save()

    const loseBalance = (await loseUser.balance()) || {balance: 0, bonus_balance: 0};
    

    const loseTransaction = await loseUser.transactions().create({
      transaction_type_id: 9,
      transaction_description_id: 1,
      currency_id: currency.id,
      amount: 5,
      balance: loseBalance.balance - 5,
      bonus_balance: loseBalance.bonus_balance,
      is_success: true,
      is_approved: true,
    }, trx);
    await trx.commit();

    const disputeWinner = await MatchDispute.query().where('match_id',match.id).where('user_id',postParams.user_id).first()
    if(disputeWinner){
      disputeWinner.is_resolwed = 1
      await disputeWinner.save()
    }
  
    const disputeLoser = await MatchDispute.query().where('match_id',match.id).whereNot('user_id','=',postParams.user_id).first()
    if(disputeLoser){
      disputeLoser.is_resolwed = 1
      await disputeLoser.save()
    }
    
    

    
    return transform.item(match, MatchTransformer);
  }


  async drawRequest({auth,request,response}){
    const params = request.all();
    if(!params.user_id || !params.match_id) {
      response.status(404).json({
        message: 'Check parameters',
      })
    }
    const {rows} = await DrawThrottle.query()
    .where('user_id', '=', params.user_id)
    .where('match_id', '=', params.match_id)
    .fetch()
    console.log(rows)

    if(rows.length < 2){
      const newThrottle = await DrawThrottle.create({
        'user_id':params.user_id,
        'match_id': params.match_id
      })
      if(newThrottle){
        response.status(200).json({
          throttle: rows.length + 1
        })
      }else{
        response.status(404).json({
          message: 'Insert Error',
          throttle: rows.length + 1
        })
      }
    }else{
      response.status(403).json({
        message: 'Daha fazla istek gönderemezsiniz',
        throttle: rows.length + 1
      })
    }
  }
  /**
   * Match Distputes
   * 
   */
  async disputes({auth,params,transform,response}){
    const matches = await Match.query()
                          //.has('disputes','>',0)
                          .whereHas('disputes', (builder) => {
                            builder.where('is_resolwed', false)
                            }, '>', 0)
                          .orderBy('matches.created_at','DESC')
                          .paginate()

   
    return transform.paginate(matches,MatchTransformer);

  }


  /**
   * Match Distpute Approve
   * [POST] /v1/match/dispute/approve
   * 
   */
  async dispute_approve({auth,request,transform,response}){
    const params = request.post()

    const match = await Match.query().where('uuid',params.match_uuid).with('scores').first()

    

    return response.json({data:match})
    
    return transform.paginate(matches,MatchTransformer);

  }


  /**
   * User check match score entered
   */
  async check_user_match_score({auth,params,request,response}){
    let postParams = request.only(['user_uuid']);
    const match = await Match.query().where('uuid','=',params.uuid).first();
    const user = await User.query().where('uuid','=',postParams.user_uuid).first()
    
    const match_user = await MatchUser.query().where('user_id','=',user.id).where('match_id','=',match.id).last()
    const check_score = await MatchScore.query().where('match_user_id','=',match_user.id).where('match_id','=',match_user.match_id).first()
    return (check_score) ? response.json({hasscore:true}) : response.json({hasscore:false});

  }

  async finish_unfinished_match(match_uuid){
    const match = await Match.query().where('uuid','=',match_uuid).first()
    const match_time = new Date(match.updated_at);
    const current_time = new Date();
    const diff = current_time - match_time;
    var hours = Math.abs(current_time - match_time) / 36e5;
    
    if(hours > 2 && !match.finished_at){
      
      const match_scores = await MatchScore.query().where('match_id',match.id).groupBy('match_user_id').fetch()
      const match_json = JSON.parse(JSON.stringify(match_scores))
      let match_winner = null
      for(const i in match_json){
        if(match_json[i].home > match_json[i].away){
          match_winner = await MatchUser.query().where('match_id','=',match.id).where('match_user_role_id','=',2).first()
        }else{
          match_winner = await MatchUser.query().where('match_id','=',match.id).where('match_user_role_id','=',3).first()
        }
        
      }
      if(match_winner){

        const winnerUser = await User.query().where('id',match_winner.user_id).first()
      
        const balance = (await winnerUser.balance()) || {balance: 0, bonus_balance: 0};
        const currency = await Currency.query().where('code', 'EUR').first();
        const trx = await Database.beginTransaction();

        let total = parseFloat(match.wager) * 2;
        let amount = parseFloat(total - ((total / 100) * 10));

        const transaction = await winnerUser.transactions().create({
          transaction_type_id: 4,
          transaction_description_id: 1,
          currency_id: currency.id,
          amount: amount,
          balance: balance.balance + amount,
          bonus_balance: balance.bonus_balance,
          is_success: true,
          is_approved: true,
        }, trx);

        match.finished_at = new Date();
        await match.save();

      }
      
      
    }
    
  }




}

module.exports = MatchController;
