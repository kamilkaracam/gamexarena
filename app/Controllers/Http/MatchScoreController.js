'use strict';

const Event = use('Event');

const Match = use('App/Models/Match');

const MatchBusinessValidationException = use('App/Exceptions/MatchBusinessValidationException');

/**
 * Resourceful controller for interacting with matchscores
 */
class MatchScoreController {
  /**
   * Submit match score
   * [POST] /v1/matches/{uuid}/score
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({auth, params, request, response}) {
    const data = request.only(['home', 'away']);
    const match = await Match.findByOrFail('uuid', params.uuid);

    const competitors = await match.competitors().fetch();

    const opponent = competitors.rows.find(n => n.uuid === auth.user.uuid);
    if (!opponent) {
      throw new MatchBusinessValidationException('Maçın tarafı değilsiniz', 403);
    }

    const pivotMatchUser = opponent.$relations.pivot;
    
    const score = await match.scores().create({
      match_user_id: pivotMatchUser.id,
      home: data.home,
      away: data.away,
    });

    // Maçın tamamlanması olay içinde gerçekleşiyor
    Event.fire('submit-score::match', {match, type: pivotMatchUser.match_user_role_id === 2 ? 'home' : 'away'});

    return response.status(201).json({});
  }

  async checkUserScore({match, matchUser}) {
    //await match.scores().where('match_id',match.id).delete()
    const exist = await match.scores().where('match_user_id', matchUser.id).first();
    if (exist) {
      throw new MatchBusinessValidationException('Bu maça daha önce skor girişi yaptınız.', 403);
    }
  }
}

module.exports = MatchScoreController;
