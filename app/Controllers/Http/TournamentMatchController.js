'use strict';

const Tournament = use('App/Models/Tournament');

const MatchTransformer = use('App/Transformers/MatchTransformer');

/**
 * Resourceful controller for interacting with tournamentmatches
 */
class TournamentMatchController {
  /**
   * Show a list of all tournamentmatches.
   * GET tournamentmatches
   *
   * @param {object} ctx
   */
  async index({params, transform}) {
    // const tournament = await Tournament.query().with('matches').where('uuid', params.uuid).first();
    const tournament = await Tournament.findByOrFail('uuid', params.uuid);

    return transform.include(['home', 'away']).paginate(await tournament.matches().paginate(1, 100), MatchTransformer);
  }
}

module.exports = TournamentMatchController;
