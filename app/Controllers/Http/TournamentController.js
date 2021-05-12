'use strict'

const Event = use('Event');

const Tournament = use('App/Models/Tournament');
const TournamentRule = use('App/Models/TournamentRuleTranslation');
const Currency = use('App/Models/Currency');

const TournamentTransformer = use('App/Transformers/TournamentTransformer');

/**
 * Resourceful controller for interacting with tournaments
 */
class TournamentController {
  /**
   * Show a list of all tournaments.
   * GET tournaments
   */
  async index({transform}) {
    return transform.paginate(await Tournament.query().paginate(), TournamentTransformer)
  }

  /**
   * Create/save a new tournament.
   * POST tournaments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
    const params = request.all();

    const tournamentParams = {
      title: params.title,
      cover: params.cover || null,
      platform_id: params.platform_id,
      game_id: params.game_id,
      game_type_id: params.game_type_id,
      entry_fee: params.entry_fee,
      total_prize: params.total_prize,
      currency_id: (await Currency.findByOrFail('code', 'EUR')).id,
      additional_info: params.additional_info || null,
      is_active: params.is_active,
      round_expiring_time: params.round_expiring_time,
      started_at: params.started_at,
      last_registration_at: params.last_registration_at,
    };
    
    const tournament = await Tournament.create(tournamentParams);

    const languages = ['tr','en','de'];

    for(const i in languages){
      const rule = new TournamentRule;
      rule.tournament_id = tournament.id;
      switch(languages[i]){
        case 'tr':
          rule.lang = 'tr';
          rule.rule = params.tournamentrules.tr;
        break;
        case 'en':
          rule.lang = 'en';
          rule.rule = params.tournamentrules.en;
        break;
        case 'de':
          rule.lang = 'de';
          rule.rule = params.tournamentrules.de;
        break;
      }
      await rule.save();
    }


    let promises = [];

    promises.push(tournament.options().attach(params.options));
    promises.push(tournament.prizes().createMany(params.prizes));

    await Promise.all(promises);

    Event.fire('created::tournament', {tournament});

    return response.status(201)
      .header('new-object', tournament.uuid)
      .json({})
  }

  /**
   * Display a single tournament.
   * GET tournaments/:id
   */
  async show({params, transform}) {
    return transform.item(await Tournament.findByOrFail('uuid', params.id), TournamentTransformer)
  }

  /**
   * Update tournament details.
   * PUT or PATCH tournaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a tournament with id.
   * DELETE tournaments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
    const tournament = await Tournament.findByOrFail('uuid', params.id);

    await tournament.competitors().detach();
    await tournament.prizes().delete();
    await tournament.options().detach();

    await TournamentRule.query().where('tournament_id','=',tournament.id).delete();

    await tournament.delete();

    return {};
  }
}

module.exports = TournamentController
