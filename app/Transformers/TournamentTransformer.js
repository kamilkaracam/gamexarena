'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const CurrencyTransformer = use('App/Transformers/CurrencyTransformer')
const PlatformTransformer = use('App/Transformers/PlatformTransformer')
const GameTransformer = use('App/Transformers/GameTransformer')
const GameTypeTransformer = use('App/Transformers/GameTypeTransformer')
const GameRuleOptionTransformer = use('App/Transformers/GameRuleOptionTransformer')
const TournamentPrizeTransformer = use('App/Transformers/TournamentPrizeTransformer')
const TournamentRuleTranslationTransformer = use('App/Transformers/TournamentRuleTranslationTransformer')

/**
 * TournamentTransformer class
 *
 * @class TournamentTransformer
 * @constructor
 */
class TournamentTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'currency',
      'prizes',
      'platform',
      'game',
      'gameType',
      'options',
      'tournamentrules'
    ];
  }

  defaultInclude() {
    return [
      'prizes',
      'tournamentrules'
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(tournament) {
    return {
      uuid: tournament.uuid,
      title: tournament.title,
      cover: tournament.cover,
      entry_fee: tournament.entry_fee,
      total_prize: tournament.total_prize,
      additional_info: tournament.additional_info,
      started_at: tournament.started_at,
      last_registration_at: tournament.last_registration_at
    }
  }

  includeCurrency(tournament) {
    return this.item(tournament.getRelated('currency'), CurrencyTransformer)
  }

  includePrizes(tournament) {
    return this.collection(tournament.getRelated('prizes'), TournamentPrizeTransformer)
  }

  includePlatform(tournament) {
    return this.item(tournament.getRelated('platform'), PlatformTransformer)
  }

  includeGame(tournament) {
    return this.item(tournament.getRelated('game'), GameTransformer)
  }

  includeGameType(tournament) {
    return this.item(tournament.getRelated('gameType'), GameTypeTransformer)
  }

  includeOptions(tournament) {
    return this.collection(tournament.getRelated('options'), GameRuleOptionTransformer)
  }

  includeTournamentrules(tournament) {
    return this.collection(tournament.getRelated('tournamentrules'), TournamentRuleTranslationTransformer)
  }
}

module.exports = TournamentTransformer
