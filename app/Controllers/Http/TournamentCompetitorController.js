'use strict'

const Tournament = use('App/Models/Tournament')

const UserTransformer = use('App/Transformers/UserTransformer')

/**
 * Resourceful controller for interacting with tournamentusers
 */
class TournamentCompetitorController {
  /**
   * Show a list of all tournamentusers.
   * [GET] tournaments/{uuid}/users
   *
   * @param {object} ctx
   */
  async index({params, transform}) {
    const tournament = await Tournament.findByOrFail('uuid', params.uuid)

    return transform.paginate(await tournament.competitors().paginate(1, 100), UserTransformer)
  }

  /**
   * Create/save a new tournamentuser.
   * [POST] tournaments/{uuid}/users
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async store({auth, params, response}) {
    if (await auth.user.tournaments().whereIn('id', [1, 2, 3, 4]).getCount()) {
      return response.status(403).json({
        message: 'Açılış turnuvalarından yalnızca birine katılabilirsiniz.'
      })
    }

    const tournament = await Tournament.findByOrFail('uuid', params.uuid)

    await tournament.competitors().attach(auth.user.id)

    return response.status(201).json({})
  }

  /**
   * Delete a tournamentuser with id.
   * [DELETE] tournaments/{uuid}/users
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({auth, params, response}) {
    const tournament = await Tournament.findByOrFail('uuid', params.uuid)

    await tournament.competitors().detach(auth.user.id)

    return response.json({})
  }
}

module.exports = TournamentCompetitorController
