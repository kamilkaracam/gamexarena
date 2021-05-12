'use strict';

const _ = use('lodash');

const Currency = use('App/Models/Currency');
const TransactionType = use('App/Models/TransactionType');
const Tournament = use('App/Models/Tournament');
const User = use('App/Models/User');

class FinishTournament {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'FinishTournament-job'
  }

  // This is where the work is done.
  async handle(data) {
    console.log('========== FinishTournament-job started ==========');

    try {
      const tournament = await Tournament.query()
        .where('uuid', data.tournament.uuid)
        .with('prizes')
        .with('matches', builder => {
          builder.where('round_number', data.last_round)
            .with('home')
            .with('away')
            .with('scores')
        })
        .first();

      tournament.finished_at = new Date();
      await tournament.save();

      // Dizi olarak geliyor ama final olduğu için tek maç olacak
      const matches = tournament.getRelated('matches').first();

      const approvedScore = matches.getRelated('scores').toJSON().find(n => n.is_approved);

      // TODO: Onaylanmış skor yoksa?

      let promises = [];

      if (approvedScore.home !== approvedScore.away) {
        promises.push(
          tournament.competitors().pivotQuery()
            .where('user_id', matches.getRelated('home').first().toJSON().id)
            .update({rank: approvedScore.home > approvedScore.away ? 1 : 2})
        );

        promises.push(
          tournament.competitors().pivotQuery()
            .where('user_id', matches.getRelated('away').first().toJSON().id)
            .update({rank: approvedScore.home > approvedScore.away ? 2 : 1})
        );
      } else {
        // TODO: Final maçı ise ne yapılacak
      }

      await Promise.all(promises);

      this.currency = await Currency.findByOrFail('code', 'EUR');
      this.balanceType = await TransactionType.findByOrFail('slug', 'balance-add');
      this.bonusBalanceType = await TransactionType.findByOrFail('slug', 'bonus-balance-add');

      this.prizePromises = [];

      const competitors = (await tournament.competitors().fetch()).toJSON();
      const prizes = await tournament.getRelated('prizes').toJSON();
      for (let prize of prizes) {
        await this.prizeDistribution(prize, competitors);
      }

      await Promise.all(this.prizePromises);

      console.log('========== Turnuva tamamlandı [' + data.tournament.uuid + '] ==========');

    } catch (e) {
      console.log(e);
    }
  }

  async prizeDistribution(prize, competitors) {
    let range = prize.is_range ? _.range(prize.start, prize.end + 1) : [prize.start];
    let winners = competitors.filter(n => range.includes(n.pivot.rank));

    for (let winner of winners) {
      this.prizePromises.push(this.assignPrize(winner, prize));
    }
  }

  async assignPrize(competitor, prize) {
    const user = await User.find(competitor.id);
    const account = await user.balance() || {
      balance: 0,
      bonus_balance: 0
    };

    return prize.is_bonus
      ? this.addBonusBalance(user, account, prize.prize)
      : this.addBalance(user, account, prize.prize);
  }

  async addBalance(user, account, amount) {
    return await user.transactions().create({
      transaction_type_id: this.balanceType.id,
      transaction_description_id: 1,
      currency_id: this.currency.id,
      amount: amount,
      balance: parseFloat(account.balance) + parseFloat(amount),
      bonus_balance: account.bonus_balance,
      is_success: true,
      is_approved: true,
    });
  }

  async addBonusBalance(user, account, amount) {
    return await user.transactions().create({
      transaction_type_id: this.bonusBalanceType.id,
      transaction_description_id: 1,
      currency_id: this.currency.id,
      amount: amount,
      balance: parseFloat(account.balance),
      bonus_balance: parseFloat(account.bonus_balance) + parseFloat(amount),
      is_success: true,
      is_approved: true,
    });
  }
}

module.exports = FinishTournament;
