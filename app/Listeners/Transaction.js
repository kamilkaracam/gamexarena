'use strict'

const Transaction = exports = module.exports = {};

Transaction.spend = async ({match, user}) => {
  // const user = match.away()
};

Transaction.refund = async ({user, amount}) => {
  const balance = (await user.balance()) || {balance: 0, bonus_balance: 0};

  await user.transactions().create({
    transaction_type_id: 4,
    transaction_description_id: 1,
    currency_id: 1,
    amount: amount,
    balance: parseFloat(balance.balance) + parseFloat(amount),
    bonus_balance: balance.bonus_balance,
    is_success: true,
    is_approved: true,
  });
};

Transaction.refundAway = async ({match, away}) => {
  await Transaction.refund({user: away, amount: match.wager});
};

Transaction.refundHome = async ({match, home}) => {
  await Transaction.refund({user: home, amount: match.wager});
};

Transaction.earn = async ({match}) => {
  const scores = (await match.scores().fetch()).toJSON();
  const home = await match.home().first();
  const away = await match.away().first();

  let homeWin = null
  let awayWin = null
  if((scores[0].home > scores[0].away) || (scores[1].home > scores[1].away)){
    homeWin = true
  }
  if((scores[0].home < scores[0].away) || (scores[1].home < scores[1].away)){
    awayWin = true
  }

  let winner;
  
  // TODO: Katılımcı sayısı değişebilir
  let total = parseFloat(match.wager) * 2;

  let amount = parseFloat(total - ((total / 100) * 10));
  
    if (homeWin && !awayWin) {
      // TODO: Ev sahibi kazanır
      Transaction.refund({user: home, amount});
    } else if (awayWin && !homeWin) {
      // TODO: Deplasman kazanır
      Transaction.refund({user: away, amount});
    } else {
      // TODO: Beraberlik
    }
  
};
