'use strict';

const Drive = use('Drive');
const Uuid = use('uuid/v4');

const Match = use('App/Models/Match');
const MatchDispute = use('App/Models/MatchDispute');

const MatchDisputeTransformer = use('App/Transformers/MatchDisputeTransformer');

const MatchBusinessValidationException = use('App/Exceptions/MatchBusinessValidationException');

const EXPIRE_MINUTE = 120;

/**
 * Resourceful controller for interacting with matchdisputes
 */
class MatchDisputeController {
  /**
   * Show a list of all matchdisputes.
   * GET matchdisputes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({auth, params, request, transform}) {
    const match = await Match.findByOrFail('uuid', params.uuid);

    return transform.paginate(await match.disputes().paginate(), MatchDisputeTransformer);
  }

  /**
   * Create/save a new matchdispute.
   * POST matchdisputes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({auth, params, request, response}) {
    const match = await Match.findByOrFail('uuid', params.uuid);

    const competitors = await match.competitors().fetch();

    const opponent = competitors.rows.find(n => n.uuid === auth.user.uuid);
    if (!opponent) {
      throw new MatchBusinessValidationException('Maçın tarafı değilsiniz', 403);
    }
    const diff = Math.floor((new Date() - match.finished_at) / (1000 * 60));
    if (diff > EXPIRE_MINUTE) {
      throw new MatchBusinessValidationException('Bildirim süreniz doldu', 403);
    }

    const hasDispute = await MatchDispute.query().where('user_id','=',auth.user.id).where('match_id','=',match.id).first();
    if(hasDispute){
      throw new MatchBusinessValidationException('You uploaded dispute image before', 403);
    }
    
    

    const post = request.post();

    const pattern = /^data:image\/(png|jpeg|jpg);base64,/;
    const screenshot = post.screenshot.replace(pattern, "");

    let ext = null;
    const fileType = post.screenshot.match(pattern);

    switch (fileType[1]) {
      case 'png':
        ext = '.png';
        break;
      case 'jpg':
      case 'jpeg':
        ext = '.jpg';
        break;
      default:
        throw new MatchBusinessValidationException('Desteklenmeyen dosya tipi', 403);
        break;
    }

    const date = new Date();

    //const filePath = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    const filePath = 'disputes/';
    const fullPath = filePath + Uuid() + ext;

    await Drive.put('uploads/' + fullPath, Buffer.from(screenshot, 'base64'));

    await match.disputes().create({
      user_id: auth.user.id,
      screenshot: fullPath,
      description: post.description
    });

    return response.status(201).json({});
  }

  /**
   * Delete a matchdispute with id.
   * DELETE matchdisputes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
  }
}

module.exports = MatchDisputeController;
