'use strict';

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract');
const MatchTransformer = use('App/Transformers/MatchTransformer');
const UserTransformer = use('App/Transformers/UserTransformer');

/**
 * MatchDisputeTransformer class
 *
 * @class MatchDisputeTransformer
 * @constructor
 */
class MatchDisputeTransformer extends TransformerAbstract {
  
  transform(dispute) {
    return {
      id: dispute.id,
      match_id: dispute.match.id,
      user_id: dispute.user_id,
      screenshot: dispute.screenshot,
      description: dispute.description,
      created_at: dispute.created_at,
    }
  }


}

module.exports = MatchDisputeTransformer;
