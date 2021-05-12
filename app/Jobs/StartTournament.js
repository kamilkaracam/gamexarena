'use strict';

const kue = use('Kue');

const Tournament = use('App/Models/Tournament');
const MatchStatus = use('App/Models/MatchStatus');
const MatchUserRole = use('App/Models/MatchUserRole');

const StartNextRound = use('App/Jobs/StartNextRound');

class StartTournament {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'StartTournament-job'
  }

  // This is where the work is done.
  async handle(data) {
    try {
      console.log('========== StartTournament-job started ==========');

      const tournament = await Tournament.query().where('uuid', data.uuid).withCount('competitors').first();

      let matchCount = 2;

      for (let i = 1; i <= 15; i++) {
        if (Math.pow(2, i) >= tournament.competitors_count) {
          matchCount = Math.pow(2, i) / 2;
          break;
        }
      }

      const options = (await tournament.options().fetch()).toJSON();

      const competitors = (await tournament.competitors().fetch()).toJSON();
      const homeTeams = competitors.slice(0, matchCount);
      const awayTeams = competitors.slice(matchCount);

      const matchStatus = await MatchStatus.findByOrFail('slug', 'invited');

      const roleCreator = await MatchUserRole.findByOrFail('slug', 'creator');
      const roleHome = await MatchUserRole.findByOrFail('slug', 'home');
      const roleAway = await MatchUserRole.findByOrFail('slug', 'away');

      while (homeTeams.length) {
        console.log('========== ' + (matchCount - homeTeams.length) + '. maç oluşturuluyor ==========');

        const match = await tournament.matches().create({
          round_number: 1,
          sort_number: (matchCount - homeTeams.length) + 1,
          platform_id: tournament.platform_id,
          game_id: tournament.game_id,
          game_type_id: tournament.game_type_id,
          status_id: matchStatus.id,
          wager: 0,
          currency_id: tournament.currency_id,
          custom_rules: tournament.additional_info,
        });

        let promises = [];

        for (let option of options) {
          promises.push(match.options().attach(option.id));
        }

        let home = homeTeams.shift();
        let away = awayTeams.shift();

        const userRoles = [
          {user: home, role: roleCreator},
          {user: home, role: roleHome},
          {user: away, role: roleAway},
        ];

        for (let role of userRoles) {
          if (role.user) {
            promises.push(match.users().attach(role.user.id, async row => {
              row.is_approved = true;
              row.match_user_role_id = role.role.id;
            }));
          }
        }

        await Promise.all(promises);
      }

      let expiringTime = new Date();
      expiringTime.setMinutes(expiringTime.getMinutes() + tournament.round_expiring_time);

      kue.dispatch(StartNextRound.key, {tournament, last_round: 1})
        .delay(expiringTime);

      console.log('========== Turnuva başlatıldı [' + tournament.uuid + '] ==========');

    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = StartTournament;
