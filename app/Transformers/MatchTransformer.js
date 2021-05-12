'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const CurrencyTransformer = use('App/Transformers/CurrencyTransformer')
const PlatformTransformer = use('App/Transformers/PlatformTransformer')
const GameTransformer = use('App/Transformers/GameTransformer')
const GameTypeTransformer = use('App/Transformers/GameTypeTransformer')
const GameRuleOptionTransformer = use('App/Transformers/GameRuleOptionTransformer')
const MatchScoreTransformer = use('App/Transformers/MatchScoreTransformer');
const MatchDisputeTransformer = use('App/Transformers/MatchDisputeTransformer');

/**
 * MatchTransformer class
 *
 * @class MatchTransformer
 * @constructor
 */
class MatchTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'currency',
      'platform',
      'game',
      'type',
      'options',
      'scores',
      'home',
      'away',
      'disputes',
      'winner'
    ];
  }

  defaultInclude() {
    return [
      'currency',
      'platform',
      'game',
      'home',
      'away',
      'disputes',
      'scores',
      'winner'
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(match) {
    return {
      uuid: match.uuid,
      wager: match.wager,
      custom_rules: match.custom_rules,
      is_tournament_match: !!match.tournament_id,
      round_number: match.round_number,
      sort_number: match.sort_number,
      started_at: match.started_at,
      finished_at: match.finished_at,
      created_at: match.created_at,
    }
  }

  includeCurrency(match) {
    return this.item(match.getRelated('currency'), CurrencyTransformer)
  }

  includePlatform(match) {
    return this.item(match.getRelated('platform'), PlatformTransformer)
  }

  includeGame(match) {
    return this.item(match.getRelated('game'), GameTransformer)
  }

  includeType(match) {
    return this.item(match.getRelated('type'), GameTypeTransformer)
  }

  includeOptions(match) {
    return this.collection(match.getRelated('options'), GameRuleOptionTransformer)
  }

  includeScores(match) {
    return this.collection(match.getRelated('scores'), MatchScoreTransformer);
  }

  includeDisputes(match) {
    return this.collection(match.getRelated('disputes'), MatchDisputeTransformer);
  }

  async includeHome(match) {
    const home = await match.getRelated('home').first();

    return home ? this.item(home, user => this._userTransformer(user)) : this.null();
  }

  async includeAway(match) {
    const away = await match.getRelated('away').first();

    return away ? this.item(away, user => this._userTransformer(user)) : this.null();
  }

  async includeWinner(match) {
    const matchScores = match.getRelated('scores');
    const approvedScore = JSON.parse(JSON.stringify(matchScores))
    
    const matchHome = match.getRelated('home').first();
    const matchAway = match.getRelated('away').first();
    if(!approvedScore[0]){
      return {};
    }
    //return approvedScore[0].home;
    if (approvedScore[0] && approvedScore[0].home && approvedScore[0].away && approvedScore[0].is_approved && (approvedScore[0].home > approvedScore[0].away && approvedScore[1].home > approvedScore[1].away)) {
      return matchHome;
    } else if (approvedScore[0] && approvedScore[0].home && approvedScore[0].away && approvedScore[0].is_approved && (approvedScore[0].home < approvedScore[0].away  && approvedScore[1].home < approvedScore[1].away)) {
      return matchAway;
    }
  }

  _userTransformer(user) {
    return {
      uuid: user.uuid,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      is_approved: Boolean(user.$relations.pivot.is_approved),
    }
  }
}

module.exports = MatchTransformer
