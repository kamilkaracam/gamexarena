'use strict';

const _ = use('lodash');
const kue = use('Kue');

const Tournament = use('App/Models/Tournament');
const Match = use('App/Models/Match');
const MatchStatus = use('App/Models/MatchStatus');
const MatchUserRole = use('App/Models/MatchUserRole');

const FinishTournament = use('App/Jobs/FinishTournament');

class StartNextRound {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'StartNextRound-job'
  }

  // This is where the work is done.
  async handle(data) {
    try {
      console.log('========== StartNextRound-job started ==========');

      const tournament = await Tournament.query()
        .where('uuid', data.tournament.uuid)
        .with('options')
        .with('matches', builder => {
          builder.where('round_number', data.last_round)
            .with('home')
            .with('away')
            .with('scores')
        })
        .first();

      this.roles = (await MatchUserRole.query().fetch()).toJSON();
      this.matchStatus = await MatchStatus.findByOrFail('slug', 'invited');

      // Sıralama ile çekilip ikişerli bölündüğünde birbiri ile eşleşmesi gereken maçları bulmuş oluruz
      let matches = tournament.getRelated('matches').toJSON();

      for (let match of _.chunk(matches, 2)) {
        let firstMatchWinner = await this.checkMatchStatus({tournament, match: match[0]})
          ? await this.getWinner(match[0])
          : null;

        let secondMatchWinner = await this.checkMatchStatus({tournament, match: match[1]})
          ? await this.getWinner(match[1])
          : null;

        await this.createNextMatch({tournament, match: match[1], home: firstMatchWinner, away: secondMatchWinner});
      }

      let expiringTime = new Date();
      expiringTime.setMinutes(expiringTime.getMinutes() + tournament.round_expiring_time);

      if (matches.length > 2) {
        console.log('========== Yeni tur maçları yaratıldı ==========');
        console.log('========== ' + matches.length + ' ==========');

        kue.dispatch(StartNextRound.key, {tournament, last_round: data.last_round + 1})
          .delay(expiringTime);
      } else {
        console.log('========== Final maçı yaratıldı ==========');

        kue.dispatch(FinishTournament.key, {tournament, last_round: data.last_round + 1})
          .delay(expiringTime);
      }

    } catch (e) {
      console.log(e);
    }
  }

  async checkMatchStatus({tournament, match}) {
    if (!match.scores) {
      // TODO: Skor girişi olmamış iki taraf da elenir
      await this.eliminate({tournament, ids: [match.home[0].id, match.away[0].id]});
      return false;
    }

    if (!match.scores.find(n => n.is_approved)) {
      // TODO: Skor anlaşmazlığı var iki taraf da elenir para iadesi yapılır
      await this.eliminate({tournament, ids: [match.home[0].id, match.away[0].id]});
      return false;
    }

    return true;
  }

  async eliminate({tournament, ids}) {
    await tournament.competitors()
      .pivotQuery()
      .whereIn('user_id', ids)
      .update({
        rank: 9999,
      });
  }

  async getWinner(match) {
    const approvedScore = match.scores.find(n => n.is_approved);
    if (approvedScore.home > approvedScore.away) {
      return match.home[0];
    } else if (approvedScore.home < approvedScore.away) {
      return match.away[0];
    }
  }

  async createNextMatch({tournament, match, home, away}) {
    const newMatch = await Match.create({
      tournament_id: tournament.id,
      round_number: match.round_number + 1,
      sort_number: match.sort_number % 2 ? (match.sort_number + 1) / 2 : match.sort_number / 2,
      platform_id: tournament.platform_id,
      game_id: tournament.game_id,
      game_type_id: tournament.game_type_id,
      status_id: this.matchStatus.id,
      wager: 0,
      currency_id: tournament.currency_id,
      custom_rules: tournament.additional_info,
    });

    let optionIds = [], promises = [];

    for (let option of tournament.getRelated('options').toJSON()) {
      optionIds.push(option.id);
    }

    promises.push(newMatch.options().attach(optionIds));

    if (home) {
      promises.push(this.attachUser({match: newMatch, user: home, roleSlug: 'creator'}));
      promises.push(this.attachUser({match: newMatch, user: home, roleSlug: 'home'}));
    }

    if (away) {
      // Home elenmişse away home olarak tanımlanıyor
      promises.push(this.attachUser({match: newMatch, user: away, roleSlug: home ? 'away' : 'home'}));
    }

    await Promise.all(promises);
  }

  async attachUser({match, user, roleSlug}) {
    const role = this.roles.find(n => n.slug === roleSlug);

    return await match.users().attach(user.id, async row => {
      row.is_approved = true;
      row.match_user_role_id = role.id;
    });
  }
}

module.exports = StartNextRound;
